import type { suggestRecipesFromIngredients } from '@/ai/flows/suggest-recipes-from-ingredients';
import type { z } from 'zod';

type SuggestRecipesOutput = ReturnType<typeof suggestRecipesFromIngredients>;
type UnwrappedSuggestRecipesOutput = SuggestRecipesOutput extends Promise<infer U> ? U : never;
export type Recipe = UnwrappedSuggestRecipesOutput[0];
