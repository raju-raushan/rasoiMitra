import type { Recipe } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Salad } from 'lucide-react';

interface RecipeDisplayProps {
  recipes: Recipe[] | null;
  isLoading: boolean;
}

export function RecipeDisplay({ recipes, isLoading }: RecipeDisplayProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Generating Recipes...</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Please wait while we whip up some ideas.</p>
        </CardContent>
      </Card>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Recipes Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We couldn't generate any recipes from the selected ingredients. Try selecting more items!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Salad className="text-primary" />
            Suggested Recipes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {recipes.map((recipe, index) => (
            <AccordionItem value={`item-${index}`} key={recipe.name}>
              <AccordionTrigger>{recipe.name}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{recipe.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Ingredients:</h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="capitalize">{ing}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Steps:</h4>
                    <ol className="list-decimal space-y-2 pl-5 text-sm">
                      {recipe.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
