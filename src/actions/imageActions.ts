'use server';

import { Image as ImageType } from '@/context/ImageContext';
import Image from '@/models/Image';

export async function getImages({
  page = 1,
}: {
  page?: number;
}): Promise<ImageType[] | null> {
  try {
    const skip = (page - 1) * 12;
    const images = await Image.find().skip(skip).limit(12);
    return images as ImageType[];
  } catch (error: any) {
    return null;
  }
}
