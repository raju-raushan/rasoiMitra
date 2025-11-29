'use client';

import { useState } from 'react';
import type { Recipe } from '@/lib/types';
import { processFridgeImage, generateRecipes } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { AppHeader } from '@/components/fridge-chef/header';
import { ImageUploader } from '@/components/fridge-chef/image-uploader';
import { FridgeContents } from '@/components/fridge-chef/fridge-contents';
import { RecipeDisplay } from '@/components/fridge-chef/recipe-display';
import { placeHolderImages } from '@/lib/placeholder-images';

type FridgeAnalysis = {
  detectedIngredients: string[];
};

export default function Home() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isGeneratingRecipes, setIsGeneratingRecipes] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FridgeAnalysis | null>(
    null
  );
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUri = reader.result as string;
      setImagePreview(dataUri);
      setAnalysisResult(null);
      setRecipes(null);
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
    reader.readAsDataURL(file);
  };

  const handleGenerateRecipes = async (selectedIngredients: string[]) => {
    if (!selectedIngredients.length) {
      toast({
        variant: 'destructive',
        title: 'No Ingredients Selected',
        description: 'Please select ingredients to generate recipes.',
      });
      return;
    }
    setIsGeneratingRecipes(true);
    setRecipes(null);
    try {
      const recipeResult = await generateRecipes(
        selectedIngredients
      );
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
    setImagePreview(null);
    setAnalysisResult(null);
    setRecipes(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl py-8 px-4">
          <section className="text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl font-headline">
              What&apos;s in your fridge?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Upload a photo of your fridge, and our AI will suggest delicious
              recipes you can make right now.
            </p>
          </section>

          <section className="mt-8">
            <ImageUploader
              onImageUpload={handleImageUpload}
              imagePreview={imagePreview}
              isLoading={isProcessingImage}
              onClear={resetState}
              defaultImage={placeHolderImages.find(p => p.id === 'fridge-placeholder')?.imageUrl}
            />
          </section>

          {analysisResult && !isProcessingImage && (
            <section id="results" className="mt-8">
              <FridgeContents
                analysis={analysisResult}
                onGenerateRecipes={handleGenerateRecipes}
                isGeneratingRecipes={isGeneratingRecipes}
              />
            </section>
          )}

          <section id="recipes" className="mt-8">
            <RecipeDisplay
              recipes={recipes}
              isLoading={isGeneratingRecipes}
            />
          </section>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Powered by Firebase and Google AI</p>
      </footer>
    </div>
  );
}
