'use client';

import { useState, useRef, useEffect } from 'react';
import type { Recipe } from '@/lib/types';
import { processFridgeImage, generateRecipes } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from '@/components/fridge-chef/image-uploader';
import { FridgeContents } from '@/components/fridge-chef/fridge-contents';
import { RecipeDisplay } from '@/components/fridge-chef/recipe-display';
import { Button } from '@/components/ui/button';
import { Camera, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type FridgeAnalysis = {
  detectedIngredients: string[];
};

export default function DetectPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isGeneratingRecipes, setIsGeneratingRecipes] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FridgeAnalysis | null>(
    null
  );
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [view, setView] = useState<'upload' | 'live'>('upload');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    if (view === 'live') {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
  
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
        }
      };
  
      getCameraPermission();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  }, [view]);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUri = reader.result as string;
      setImagePreview(dataUri);
      setAnalysisResult(null);
      setRecipes(null);
    };
    reader.readAsDataURL(file);
  };

  const captureFromVideo = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUri);
        
        // Convert data URI to File object
        fetch(dataUri)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "fridge-capture.jpg", { type: "image/jpeg" });
            setImageFile(file);
          });
        
        setAnalysisResult(null);
        setRecipes(null);
        setView('upload'); // Switch back to upload view to show preview
      }
    }
  };

  const handleProcessImage = async () => {
    if (!imageFile && !imagePreview) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload or capture an image to process.',
      });
      return;
    }
    
    // Use imagePreview directly as it's a data URI
    const dataUri = imagePreview;
    if (!dataUri) return;

    setIsProcessingImage(true);
    try {
      const result = await processFridgeImage(dataUri);
      setAnalysisResult({
        detectedIngredients: result.ingredients,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Processing Image',
        description:
          'There was a problem analyzing your fridge. Please try again.',
      });
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleGenerateRecipes = async (selectedIngredients: string[]) => {
    setIsGeneratingRecipes(true);
    setRecipes(null);
    try {
      const recipeResult = await generateRecipes(selectedIngredients);
      setRecipes(recipeResult);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Recipes',
        description:
          'There was a problem creating recipes. Please try again.',
      });
    } finally {
      setIsGeneratingRecipes(false);
    }
  };

  const resetState = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setRecipes(null);
  };

  return (
    <div className="flex-1">
      <div className="container mx-auto grid max-w-5xl items-start gap-8 px-4 py-8">
        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant={view === 'upload' ? 'default' : 'outline'}
            onClick={() => setView('upload')}
          >
            Upload Image
          </Button>
          <Button
            variant={view === 'live' ? 'default' : 'outline'}
            onClick={() => setView('live')}
          >
            <Camera className="mr-2 h-4 w-4" />
            Live View
          </Button>
        </div>
        
        {view === 'upload' && (
          <div className="flex flex-col gap-4 items-center">
            <ImageUploader
              onImageUpload={handleImageUpload}
              imagePreview={imagePreview}
              isLoading={isProcessingImage}
              onClear={resetState}
            />
             <Button
              size="lg"
              onClick={handleProcessImage}
              disabled={isProcessingImage || !imagePreview}
              className="w-full max-w-2xl"
            >
              {isProcessingImage ? 'Scanning...' : 'Scan Fridge'}
              <Zap className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {view === 'live' && (
          <div className="flex flex-col gap-4 items-center">
             <div className="relative w-full max-w-2xl aspect-video bg-black rounded-lg">
                <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                <canvas ref={canvasRef} className="hidden" />
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <Alert variant="destructive">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera access in your browser settings to use the live view feature.
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
             </div>
            <Button size="lg" onClick={captureFromVideo} disabled={!hasCameraPermission} className="w-full max-w-2xl">
              <Camera className="mr-2 h-4 w-4" />
              Capture Image
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-8">
            {analysisResult && (
              <FridgeContents
                analysis={analysisResult}
                onGenerateRecipes={handleGenerateRecipes}
                isGeneratingRecipes={isGeneratingRecipes}
              />
            )}
            {recipes && (
              <RecipeDisplay recipes={recipes} isLoading={isGeneratingRecipes} />
            )}
            {(isGeneratingRecipes && !recipes) && (
              <RecipeDisplay recipes={null} isLoading={true} />
            )}
          </div>
      </div>
    </div>
  );
}
