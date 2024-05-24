'use server';

import { Image as ImageType } from '@/context/ImageContext';
import { connect } from '@/db/dbCongig';
import Image from '@/models/Image';

connect();

export async function getImages({
  page = 1,
}: {
  page?: number;
}): Promise<ImageType[] | null> {
  try {
    const skip = (page - 1) * 12;
    const images = await Image.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(12);

    return images as ImageType[];
  } catch (error: any) {
    return null;
  }
}

export async function getImagesCount() {
  try {
    const images = await Image.find();
    return images.length;
  } catch (error) {
    console.log(error);
  }
}
