'use client';

import Image from 'next/image';
import { useRef, useState, type DragEvent } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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

  return (
    <div
        className={cn(
          'relative w-full max-w-lg rounded-lg',
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
        
        {imagePreview ? (
          <div className="relative w-full aspect-video">
            <Image
              src={imagePreview}
              alt="Fridge contents preview"
              fill
              className="object-contain rounded-lg p-2"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full"
              onClick={e => {
                e.stopPropagation();
                onClear();
              }}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear image</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center p-8 cursor-pointer w-full">
            <UploadCloud className="h-12 w-12 text-primary" />
            <p className="font-semibold text-foreground">
              Drag & drop your image here, or browse
            </p>
            <p className="text-sm text-muted-foreground">Supports: PNG, JPG</p>
            <Button variant="outline" size="sm" className="mt-2" type="button" onClick={() => fileInputRef.current?.click()}>Browse files</Button>
          </div>
        )}
      </div>
  );
}
