import type { Recipe } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '../ui/button';
import { Camera, SearchX } from 'lucide-react';
import { getEmojiForRecipe } from '@/lib/utils';

interface RecipeDisplayProps {
  recipes: Recipe[] | null;
  isLoading: boolean;
  onScanAgain: () => void;
}

export function RecipeDisplay({ recipes, isLoading, onScanAgain }: RecipeDisplayProps) {
  if (isLoading) {
    return <RecipeSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Recipes You Can Make</h1>
        <Button variant="outline" onClick={onScanAgain} className='shadow-sm'>
          <Camera className="mr-2 h-4 w-4" />
          Scan Again
        </Button>
      </div>
      
      {!recipes || recipes.length === 0 ? (
        <NoRecipesFound onScanAgain={onScanAgain} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-8">
          {recipes.map((recipe) => (
            <Card key={recipe.name} className="flex flex-col rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex flex-col flex-grow p-6">
                <div className="flex justify-between items-start">
                  <span className="text-4xl mb-4">{getEmojiForRecipe(recipe.name)}</span>
                  <Accordion type="single" collapsible className="w-auto">
                    <AccordionItem value="more-info" className="border-none">
                      <AccordionTrigger className="text-sm text-muted-foreground hover:no-underline p-0 [&[data-state=open]>svg]:rotate-0">
                        <span className="mr-1">Show More</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="w-full mt-4">
                          <h3 className="font-semibold mb-2">Ingredients:</h3>
                          <ul className="list-disc space-y-1 pl-5 text-sm">
                            {recipe.ingredients.map((ing, i) => (
                              <li key={i} className="capitalize">{ing}</li>
                            ))}
                          </ul>
                          <h3 className="font-semibold mt-4 mb-2">Steps:</h3>
                          <ol className="list-decimal space-y-2 pl-5 text-sm">
                            {recipe.steps.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <h2 className="text-xl font-bold flex-1">{recipe.name}</h2>
                <p className="text-muted-foreground mt-2">
                  {recipe.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function RecipeSkeleton() {
  return (
    <div className="space-y-8">
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold">
          Generating Gourmet Ideas...
        </h2>
        <p className="text-muted-foreground">Our AI chef is working its magic.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function NoRecipesFound({ onScanAgain }: { onScanAgain: () => void }) {
  return (
    <div className="text-center py-24 flex flex-col items-center">
      <div className="bg-gray-200 rounded-full p-4 inline-block">
        <SearchX className="h-12 w-12 text-gray-500" />
      </div>
      <h2 className="mt-6 text-2xl font-bold">No Recipes Found</h2>
      <p className="mt-2 text-muted-foreground max-w-sm">
        We couldn&apos;t find any recipes with the ingredients we saw. Try
        taking a clearer photo for better results.
      </p>
      <Button onClick={onScanAgain} className="mt-8 shadow-sm">
        <Camera className="mr-2 h-4 w-4" />
        Scan Again
      </Button>
    </div>
  );
}
