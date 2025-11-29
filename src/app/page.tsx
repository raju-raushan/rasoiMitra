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
import { Button } from '@/components/ui/button';
import { Instagram, MessageSquare } from 'lucide-react';

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
        <div className="container mx-auto max-w-5xl py-8 px-4">
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

          {analysisResult && !isProcessingImage && (
            <section id="results" className="mt-12">
              <FridgeContents
                analysis={analysisResult}
                onGenerateRecipes={handleGenerateRecipes}
                isGeneratingRecipes={isGeneratingRecipes}
              />
            </section>
          )}

          <section id="recipes" className="mt-12">
            <RecipeDisplay recipes={recipes} isLoading={isGeneratingRecipes} />
          </section>
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        <div className="container flex flex-col items-center gap-4">
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <MessageSquare className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <p>© 2024 Smart Fridge AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
