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

  const handleProcessImage = async () => {
    if (!imageFile) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload an image to process.',
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
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto grid max-w-5xl items-start gap-8 px-4 py-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
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
            >
              {isProcessingImage ? 'Processing...' : 'Process Image'}
            </Button>
          </div>

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
      </main>
    </div>
  );
}
