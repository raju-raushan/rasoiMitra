'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChefHat, Loader2, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

type FridgeAnalysis = {
  isEmpty: boolean;
  suggestedShoppingList: string | null;
  detectedIngredients: string[];
};

interface FridgeContentsProps {
  analysis: FridgeAnalysis;
  onGenerateRecipes: () => void;
  isGeneratingRecipes: boolean;
}

export function FridgeContents({
  analysis,
  onGenerateRecipes,
  isGeneratingRecipes,
}: FridgeContentsProps) {
  const [showEmptyDialog, setShowEmptyDialog] = useState(false);

  useEffect(() => {
    if (analysis.isEmpty) {
      setShowEmptyDialog(true);
    }
  }, [analysis.isEmpty]);

  if (analysis.isEmpty) {
    return (
      <AlertDialog open={showEmptyDialog} onOpenChange={setShowEmptyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-accent" />
              Your Fridge is Empty!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Don&apos;t worry, we&apos;ve prepared a shopping list for you. A copy has
              been sent to your email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <h4 className="font-semibold mb-2">Suggested Shopping List:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {analysis.suggestedShoppingList?.split(',').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="h-6 w-6 text-primary" />
          Detected Ingredients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {analysis.detectedIngredients.map((ingredient, index) => (
            <div
              key={index}
              className="bg-primary/10 text-primary-foreground border border-primary/20 rounded-full px-3 py-1 text-sm font-medium"
            >
              {ingredient}
            </div>
          ))}
        </div>
        <Button onClick={onGenerateRecipes} disabled={isGeneratingRecipes}>
          {isGeneratingRecipes ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ChefHat className="mr-2 h-4 w-4" />
          )}
          Generate Recipes
        </Button>
      </CardContent>
    </Card>
  );
}
