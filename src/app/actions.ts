'use server';

import {
  detectEmptyFridgeAndSuggestShoppingList,
  suggestRecipesFromIngredients,
} from '@/ai/flows';

export async function processFridgeImage(photoDataUri: string) {
  const result = await detectEmptyFridgeAndSuggestShoppingList({
    photoDataUri,
  });
  return result;
}

export async function generateRecipes(ingredients: string[]) {
  const result = await suggestRecipesFromIngredients({ ingredients });
  return result;
}
