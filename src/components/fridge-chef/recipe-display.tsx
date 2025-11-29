import type { Recipe } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ChefHat, List, Footprints } from 'lucide-react';

interface RecipeDisplayProps {
  recipes: Recipe[] | null;
  isLoading: boolean;
}

export function RecipeDisplay({ recipes, isLoading }: RecipeDisplayProps) {
  if (isLoading) {
    return <RecipeSkeleton />;
  }

  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Bon Appétit!</h2>
        <p className="text-muted-foreground">
          Here are some recipes you can make with your ingredients.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-start gap-3 text-xl">
                <ChefHat className="h-6 w-6 text-primary mt-1 shrink-0" />
                <span className="flex-1">{recipe.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {recipe.description}
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ingredients">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 font-semibold">
                      <List className="h-4 w-4" /> Ingredients
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="capitalize">{ing}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="steps">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 font-semibold">
                      <Footprints className="h-4 w-4" /> Steps
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal space-y-2 pl-5 text-sm">
                      {recipe.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RecipeSkeleton() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Generating Gourmet Ideas...
        </h2>
        <p className="text-muted-foreground">Our AI chef is working its magic.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="pt-4 space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
