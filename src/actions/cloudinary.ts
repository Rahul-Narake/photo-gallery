'use server';

import { connect } from '@/db/dbCongig';
import Image from '@/models/Image';
import { v2 as cloudinary } from 'cloudinary';

connect();

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: 'gallery',
    },
    cloudinaryConfig.api_secret || ''
  );
  return { timestamp, signature };
}

export async function checkSignuature({
  public_id,
  version,
  signature,
}: {
  public_id: string;
  version: string;
  signature: string;
}) {
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret || ''
  );

  if (expectedSignature === signature) {
    return true;
  } else {
    return false;
  }
}

export async function saveImageURLToDB({ secure_url }: { secure_url: string }) {
  try {
    if (secure_url) {
      const response = await Image.create({ url: secure_url });
      console.log(response);
      return { message: 'Image uploaded succesfully', suceess: true };
    }
  } catch (error) {
    console.log(error);
    return { message: 'Image not uploaded succesfully', suceess: false };
  }
}
