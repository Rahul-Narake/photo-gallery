import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ImageUpload from './ImageUpload';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-4 py-1 bg-gray-900 text-slate-200 w-full h-14">
      <h1>Gallery</h1>
      <div>
        <Dialog>
          <DialogTrigger>Upload</DialogTrigger>
          <DialogContent className="bg-gray-900">
            <DialogHeader>
              <DialogTitle>Let collect our memories</DialogTitle>
            </DialogHeader>
            <div>
              <ImageUpload />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
