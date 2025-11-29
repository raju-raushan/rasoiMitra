
'use client';

import { useState } from 'react';
import type { Recipe } from '@/lib/types';
import { generateRecipes } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { RecipeDisplay } from '@/components/fridge-chef/recipe-display';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Loader2, Search } from 'lucide-react';

export default function RecipesPage() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!ingredients) {
      toast({
        variant: 'destructive',
        title: 'No Ingredients',
        description: 'Please enter some ingredients to get recipes.',
      });
      return;
    }

    setIsGenerating(true);
    setRecipes(null);

    const ingredientList = ingredients.split(',').map(i => i.trim()).filter(Boolean);

    try {
      const recipeResult = await generateRecipes(ingredientList);
      setRecipes(recipeResult);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Recipes',
        description: 'There was a problem creating recipes. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Suggest Recipes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground">
            Enter the ingredients you have, separated by commas, to get recipe suggestions.
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., chicken, rice, broccoli"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Get Recipes
            </Button>
          </div>
        </CardContent>
      </Card>

      {(recipes || isGenerating) && (
        <RecipeDisplay recipes={recipes} isLoading={isGenerating} />
      )}
    </div>
  );
}
