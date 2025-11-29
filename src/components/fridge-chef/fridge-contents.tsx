'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChefHat, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

type FridgeAnalysis = {
  detectedIngredients: string[];
};

interface FridgeContentsProps {
  analysis: FridgeAnalysis;
  onGenerateRecipes: (selectedIngredients: string[]) => void;
  isGeneratingRecipes: boolean;
}

export function FridgeContents({
  analysis,
  onGenerateRecipes,
  isGeneratingRecipes,
}: FridgeContentsProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (analysis?.detectedIngredients) {
      setSelectedIngredients(analysis.detectedIngredients);
    }
  }, [analysis]);

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedIngredients.length === analysis.detectedIngredients.length) {
      setSelectedIngredients([]);
    } else {
      setSelectedIngredients(analysis.detectedIngredients);
    }
  }


  if (!analysis.detectedIngredients.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Ingredients Detected</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We couldn&apos;t find any ingredients in the image. Please try a different
            photo.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Check className="h-6 w-6 text-primary" />
          Detected Ingredients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground mb-4'>Uncheck any ingredients you don&apos;t want to include.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {analysis.detectedIngredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={ingredient}
                checked={selectedIngredients.includes(ingredient)}
                onCheckedChange={() => handleIngredientToggle(ingredient)}
              />
              <Label
                htmlFor={ingredient}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
              >
                {ingredient}
              </Label>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap gap-4'>
        <Button
            variant="outline"
            onClick={handleSelectAll}
            disabled={isGeneratingRecipes}
          >
            {selectedIngredients.length === analysis.detectedIngredients.length
              ? 'Deselect All'
              : 'Select All'}
          </Button>
        <Button
          size="lg"
          onClick={() => onGenerateRecipes(selectedIngredients)}
          disabled={isGeneratingRecipes || selectedIngredients.length === 0}
        >
          {isGeneratingRecipes ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ChefHat className="mr-2 h-4 w-4" />
          )}
          Generate Recipes
        </Button>
        </div>
      </CardContent>
    </Card>
  );
}
