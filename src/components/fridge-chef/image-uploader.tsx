'use client';

import Image from 'next/image';
import { useRef, useState, type DragEvent } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  defaultImage?: string;
}

export function ImageUploader({
  onImageUpload,
  imagePreview,
  isLoading,
  onClear,
  defaultImage,
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

  const imageUrl = imagePreview || defaultImage;

  const imageUploaderContent = (
    <div className="relative aspect-[3/2] w-full rounded-md bg-muted/30">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Fridge contents"
          fill
          className="object-cover rounded-md"
          data-ai-hint="open refrigerator"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-md p-8 text-center transition-all duration-300',
          imagePreview
            ? 'bg-black/50 opacity-0 hover:opacity-100'
            : 'bg-transparent'
        )}
      >
        {!isLoading && !imagePreview && (
          <>
            <div className="rounded-full border border-dashed bg-background/50 p-4">
              <UploadCloud className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-white backdrop-blur-sm p-2 rounded-md bg-black/20">
              <p className="font-semibold">Drag & drop or click to upload</p>
              <p className="text-sm text-gray-200">
                PNG, JPG, or WEBP accepted
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse Files
            </Button>
          </>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 text-white">
          <Loader2 className="h-12 w-12 animate-spin" />
          <p className="text-lg font-semibold">Analyzing your fridge...</p>
        </div>
      )}

      {imagePreview && !isLoading && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full"
          onClick={e => {
            e.stopPropagation();
            onClear();
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear image</span>
        </Button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={e => handleFileSelect(e.target.files)}
      />
    </div>
  );

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        isDragging && 'border-primary ring-2 ring-primary'
      )}
    >
      <CardContent
        className="p-2"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imageUrl ? (
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer">{imageUploaderContent}</div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <Image
                src={imageUrl}
                alt="Fridge contents enlarged"
                width={1200}
                height={800}
                className="w-full h-auto rounded-md"
              />
            </DialogContent>
          </Dialog>
        ) : (
          imageUploaderContent
        )}
      </CardContent>
    </Card>
  );
}
