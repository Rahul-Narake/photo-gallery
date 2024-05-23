'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';

import { Button } from './ui/button';
import {
  checkSignuature,
  getSignature,
  saveImageURLToDB,
} from '@/actions/cloudinary';
import axios from 'axios';
import { toast } from 'sonner';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(null);
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file size (2MB limit)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        setError('File size exceeds 2MB.');
        setImage(null);
        setPreviewUrl(null);
        return;
      }

      // Validate file type (only jpg, png, jpeg)
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('File format not supported. Only JPEG and PNG are allowed.');
        setImage(null);
        setPreviewUrl(null);
        return;
      }
      setError(null);
      setImage(file);
      previewImage(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    try {
      if (image) {
        setLoading(true);
        const { timestamp, signature } = await getSignature();
        const formData = new FormData();
        formData.append('file', image);
        formData.append(
          'api_key',
          String(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
        );
        formData.append('signature', String(signature));
        formData.append('timestamp', String(timestamp));
        formData.append('folder', 'gallery');
        const endpoint = String(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL);
        const { data } = await axios.post(endpoint, formData);
        if (data?.public_id) {
          const isValid = await checkSignuature({
            version: data?.version,
            signature: data?.signature,
            public_id: data?.public_id,
          });
          if (isValid) {
            const response = await saveImageURLToDB({
              secure_url: data?.secure_url,
            });
            setLoading(false);
            toast(response?.message);
          }
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {previewUrl && (
        <div className="mt-2 relative">
          <img
            src={previewUrl}
            alt="Image Preview"
            style={{ maxWidth: '100%', maxHeight: '400px' }}
          />
          <button
            onClick={handleImageRemove}
            className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2"
            aria-label="Remove image"
          >
            X
          </button>
        </div>
      )}
      <div className="flex justify-center mt-2">
        <Button
          className="bg-blue-400 hover:bg-blue-700"
          disabled={!image || loading}
          onClick={handleSubmit}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
