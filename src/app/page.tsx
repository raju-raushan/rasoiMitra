'use client';

import { useState } from 'react';
import type { Recipe } from '@/lib/types';
import { processFridgeImage, generateRecipes } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { AppHeader } from '@/components/fridge-chef/header';
import { ImageUploader } from '@/components/fridge-chef/image-uploader';
import { FridgeContents } from '@/components/fridge-chef/fridge-contents';
import { RecipeDisplay } from '@/components/fridge-chef/recipe-display';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

type FridgeAnalysis = {
  detectedIngredients: string[];
};

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isGeneratingRecipes, setIsGeneratingRecipes] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FridgeAnalysis | null>(
    null
  );
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const { toast } = useToast();
  const [view, setView] = useState<'upload' | 'recipes'>('upload');

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

  const handleScanImage = async () => {
    if (!imageFile) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload an image to scan.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
        const dataUri = reader.result as string;
        setIsProcessingImage(true);
        try {
            const result = await processFridgeImage(dataUri);
            setAnalysisResult({
                detectedIngredients: result.ingredients,
            });
            // Directly generate recipes after detection
            if (result.ingredients.length > 0) {
              await handleGenerateRecipes(result.ingredients);
            } else {
              setRecipes([]);
              setView('recipes');
            }
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
    reader.readAsDataURL(imageFile);
  };

  const handleGenerateRecipes = async (selectedIngredients: string[]) => {
    if (!selectedIngredients.length) {
      setRecipes([]);
      setView('recipes');
      return;
    }
    setIsGeneratingRecipes(true);
    setRecipes(null);
    try {
      const recipeResult = await generateRecipes(selectedIngredients);
      setRecipes(recipeResult);
      setView('recipes');
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
    setView('upload');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl py-8 px-4">
          {view === 'upload' && (
            <>
              <section className="text-center py-12">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                  Scan Your Fridge. Discover Recipes Instantly.
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Upload a photo of your refrigerator and let AI suggest what you can cook.
                </p>
              </section>

              <section className="mt-8 flex flex-col items-center gap-6">
                <ImageUploader
                  onImageUpload={handleImageUpload}
                  imagePreview={imagePreview}
                  isLoading={isProcessingImage}
                  onClear={resetState}
                />
                <Button
                  size="lg"
                  onClick={handleScanImage}
                  disabled={isProcessingImage || !imagePreview}
                  className="px-10 py-6 text-lg"
                >
                  {isProcessingImage ? 'Scanning...' : 'Scan'}
                </Button>
              </section>
            </>
          )}

          {view === 'recipes' && (
             <RecipeDisplay
                recipes={recipes}
                isLoading={isGeneratingRecipes}
                onScanAgain={resetState}
            />
          )}

        </div>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t bg-white">
        <div className="container">
          <p>© 2024 Smart Fridge AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
