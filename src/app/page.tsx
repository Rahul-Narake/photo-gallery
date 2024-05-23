import { getImages } from '@/actions/imageActions';
import Images from '@/components/Images';

export default async function Home() {
  const images = await getImages({});
  return (
    <div className="flex justify-center items-center text-slate-200 w-full">
      <Images initialImages={images} />
    </div>
  );
}
