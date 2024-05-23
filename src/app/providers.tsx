'use client';

import { ImageProvider } from '@/context/ImageContext';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ImageProvider>{children}</ImageProvider>;
};
