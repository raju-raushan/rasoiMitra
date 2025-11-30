'use client';

import { useState } from 'react';
import type { Recipe } from '@/lib/types';
import { processFridgeImage, generateRecipes } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from '@/components/fridge-chef/image-uploader';
import { FridgeContents } from '@/components/fridge-chef/fridge-contents';
import { RecipeDisplay } from '@/components/fridge-chef/recipe-display';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Edit, Frown } from 'lucide-react';

type FridgeAnalysis = {
  detectedIngredients: string[];
};

export default function SmartFridgePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isGeneratingRecipes, setIsGeneratingRecipes] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FridgeAnalysis | null>(
    null
  );
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [manualIngredients, setManualIngredients] = useState('');

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
    if (!imageFile && !imagePreview) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload an image to process.',
      });
      return;
    }
    
    const dataUri = imagePreview;
    if (!dataUri) return;

    setIsProcessingImage(true);
    setAnalysisResult(null);
    setRecipes(null);
    try {
      const result = await processFridgeImage(dataUri);
      setAnalysisResult({
        detectedIngredients: result.ingredients,
      });
      if (result.ingredients.length === 0) {
          // If no ingredients, generate recipes with an empty list
          // This will trigger the "Your fridge looks empty!" message
          await handleGenerateRecipes([]);
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

  const handleGenerateRecipes = async (selectedIngredients: string[]) => {
    setIsGeneratingRecipes(true);
    setRecipes(null);
    try {
      if (selectedIngredients.length > 0) {
        const recipeResult = await generateRecipes(selectedIngredients);
        setRecipes(recipeResult);
      } else {
        setRecipes([]); // Set to empty array to show "fridge empty" message
      }
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

  const handleManualSubmit = async () => {
    if (!manualIngredients.trim()) {
        toast({
            variant: 'destructive',
            title: 'No Ingredients Entered',
            description: 'Please type in some ingredients.',
        });
        return;
    }
    const ingredientsList = manualIngredients.split(',').map(i => i.trim()).filter(Boolean);
    resetState();
    setAnalysisResult({ detectedIngredients: ingredientsList });
    await handleGenerateRecipes(ingredientsList);
  }

  const resetState = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setRecipes(null);
    setManualIngredients('');
  };

  const handleScanAgain = () => {
    resetState();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Scan Your Fridge. Discover Recipes Instantly.
        </h1>
        <p className="text-muted-foreground mt-2">
            Upload a photo of your refrigerator or type in your ingredients below.
        </p>
      </div>

      {!analysisResult && (
        <>
            <Card className="w-full p-4 shadow-lg">
                <CardContent className="p-0 flex flex-col items-center gap-4">
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
                        className="w-full max-w-xs"
                    >
                        {isProcessingImage ? <Loader2 className="animate-spin" /> : 'Scan'}
                    </Button>
                </CardContent>
            </Card>

            <div className="relative w-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <span className="relative bg-background px-2 text-muted-foreground">OR</span>
            </div>

            <Card className="w-full p-4 shadow-lg">
                <CardContent className="p-0 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-xl font-semibold">
                        <Edit className="h-6 w-6 text-primary"/>
                        Manually Enter Ingredients
                    </div>
                     <p className="text-sm text-muted-foreground text-center">List the items you have, separated by commas (e.g., chicken, rice, broccoli).</p>
                    <Textarea 
                        placeholder="Type your ingredients here..."
                        className="w-full"
                        value={manualIngredients}
                        onChange={(e) => setManualIngredients(e.target.value)}
                    />
                    <Button
                        size="lg"
                        onClick={handleManualSubmit}
                        disabled={isGeneratingRecipes}
                        className="w-full max-w-xs"
                    >
                         {isGeneratingRecipes ? <Loader2 className="animate-spin" /> : 'Get Recipes'}
                    </Button>
                </CardContent>
            </Card>
        </>
      )}

      {isProcessingImage && (
        <Card className="w-full p-8 shadow-lg flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-semibold">Analyzing your fridge...</p>
        </Card>
      )}

      {analysisResult && (
          <FridgeContents
            analysis={analysisResult}
            onGenerateRecipes={handleGenerateRecipes}
            isGeneratingRecipes={isGeneratingRecipes}
            onScanAgain={handleScanAgain}
          />
      )}
      
      {isGeneratingRecipes && <RecipeDisplay recipes={null} isLoading={true} />}

      {recipes && recipes.length > 0 && <RecipeDisplay recipes={recipes} isLoading={false} />}

      {recipes && recipes.length === 0 && !isGeneratingRecipes && (
        <Card className="w-full p-8 shadow-lg flex flex-col items-center justify-center gap-4 text-center">
            <Frown className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-semibold">Your fridge looks empty!</p>
            <p className="text-sm text-muted-foreground">Sending a grocery list to your email...</p>
        </Card>
      )}
    </div>
  );
}
