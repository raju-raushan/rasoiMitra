'use server';

import {
  detectIngredientsFromImage,
  suggestRecipesFromIngredients,
} from '@/ai/flows';

export async function processFridgeImage(photoDataUri: string) {
  const result = await detectIngredientsFromImage({
    photoDataUri,
  });
  return result;
}

export async function generateRecipes(ingredients: string[]) {
  const result = await suggestRecipesFromIngredients({ ingredients });
  return result;
}
