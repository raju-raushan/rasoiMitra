'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

type FridgeAnalysis = {
  detectedIngredients: string[];
};

interface FridgeContentsProps {
  analysis: FridgeAnalysis;
  onGenerateRecipes: (selectedIngredients: string[]) => void;
  isGeneratingRecipes: boolean;
  onScanAgain: () => void;
}

export function FridgeContents({
  analysis,
  onGenerateRecipes,
  isGeneratingRecipes,
  onScanAgain,
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

  if (analysis.detectedIngredients.length === 0) {
      return null;
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          AI Detected Ingredients
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-2">
          {analysis.detectedIngredients.map((ingredient, index) => (
            <Button
              key={index}
              variant={selectedIngredients.includes(ingredient) ? 'default' : 'outline'}
              onClick={() => handleIngredientToggle(ingredient)}
              className="capitalize rounded-full"
            >
              {ingredient}
            </Button>
          ))}
        </div>
        <div className='flex flex-wrap justify-center gap-4'>
            <Button
            size="lg"
            onClick={() => onGenerateRecipes(selectedIngredients)}
            disabled={isGeneratingRecipes || selectedIngredients.length === 0}
            >
            {isGeneratingRecipes ? (
                <Loader2 className="animate-spin" />
            ) : (
                'Generate Recipes'
            )}
            </Button>
            <Button
                size="lg"
                variant="ghost"
                onClick={onScanAgain}
                disabled={isGeneratingRecipes}
            >
                Scan Again
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
