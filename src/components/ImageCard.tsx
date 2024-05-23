export default function ImageCard({ url }: { url?: string }) {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg max-h-[250px]">
      <img src={url} alt={'image'} className="w-full h-full object-cover" />
    </div>
  );
}
