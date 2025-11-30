'use client';

import type { Recipe } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Salad, Search } from 'lucide-react';
import { useState } from 'react';

interface RecipeDisplayProps {
  recipes: Recipe[] | null;
  isLoading: boolean;
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const [showMore, setShowMore] = useState(false);

    // Show first 3 steps, or all if less than 3
    const displayedSteps = showMore ? recipe.steps : recipe.steps.slice(0, 3);
    const canShowMore = recipe.steps.length > 3;

    return (
        <Card className="p-6 shadow-lg">
            <CardContent className="p-0 space-y-4">
                <div className="flex items-start gap-4">
                     <div className="p-2 bg-gray-100 rounded-full">
                        {recipe.name.toLowerCase().includes('salad') ? <Salad className="h-6 w-6 text-primary" /> : <Search className="h-6 w-6 text-primary" />}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{recipe.name}</h3>
                        <p className="text-muted-foreground text-sm">{recipe.description}</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-1">Ingredients:</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                        {recipe.ingredients.join(', ')}
                    </p>
                </div>
                
                <div>
                    <h4 className="font-semibold mb-1">Instructions:</h4>
                    <ol className="list-decimal space-y-1 pl-5 text-sm">
                        {displayedSteps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>

                {canShowMore && (
                    <Button variant="link" onClick={() => setShowMore(!showMore)} className="p-0 h-auto">
                        {showMore ? 'Show Less' : 'Show More'}
                    </Button>
                )}

            </CardContent>
        </Card>
    )
}


export function RecipeDisplay({ recipes, isLoading }: RecipeDisplayProps) {
  if (isLoading) {
    return (
      <Card className="w-full p-8 shadow-lg flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-semibold">Generating Recipes...</p>
          <p className="text-muted-foreground">Please wait while we whip up some ideas.</p>
      </Card>
    );
  }

  if (!recipes || recipes.length === 0) {
    return null; // The parent component handles the empty state
  }

  return (
    <div className="w-full space-y-8">
        <h2 className="text-center text-3xl font-bold">Recipes You Can Make</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.name} recipe={recipe} />
          ))}
        </div>
    </div>
  );
}