'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
export type Image = {
  _id: string;
  url: string;
};

interface ImageContextState {
  images: Image[] | null;
  setImages: React.Dispatch<React.SetStateAction<Image[] | null>>;
}

interface ImageProviderProps {
  children: ReactNode;
}

const ImageContext = createContext<ImageContextState | undefined>(undefined);

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<Image[] | null>([]);

  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>
  );
};

// Created a custom hook for easier access to the context
export const useImageContext = (): ImageContextState => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useYourContext must be used within a YourProvider');
  }
  return context;
};
