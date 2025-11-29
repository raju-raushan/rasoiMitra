'use client';

import Image from 'next/image';
import { useRef, useState, type DragEvent } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreview: string | null;
  isLoading: boolean;
  onClear: () => void;
}

export function ImageUploader({
  onImageUpload,
  imagePreview,
  isLoading,
  onClear,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      onImageUpload(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const imageUrl = imagePreview;

  const imageUploaderContent = (
    <div
        className={cn(
          'relative aspect-video w-full max-w-2xl rounded-lg bg-card',
          'flex flex-col items-center justify-center',
          'border-2 border-dashed border-border transition-colors',
          isDragging && 'border-primary bg-primary/10'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !imagePreview && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={e => handleFileSelect(e.target.files)}
        />
        
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 text-foreground rounded-lg">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-semibold">Analyzing your fridge...</p>
          </div>
        ) : imagePreview ? (
          <>
            <Dialog>
              <DialogTrigger asChild>
                 <div className='w-full h-full cursor-zoom-in'>
                  <Image
                    src={imagePreview}
                    alt="Fridge contents"
                    fill
                    className="object-contain rounded-lg p-2"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <Image
                  src={imagePreview}
                  alt="Fridge contents enlarged"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-md"
                />
              </DialogContent>
            </Dialog>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full"
              onClick={e => {
                e.stopPropagation();
                onClear();
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear image</span>
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center p-8 cursor-pointer">
            <div className="p-4 bg-primary/10 rounded-full">
                <ImageIcon className="h-12 w-12 text-primary" />
            </div>
            <p className="font-semibold text-foreground">
              <span className="text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-muted-foreground">JPG, or PNG (max 5MB)</p>
          </div>
        )}
      </div>
  );

  return imageUploaderContent;
}
