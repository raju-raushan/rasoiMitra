'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting recipes based on a list of ingredients.
 *
 * The flow takes a list of ingredients as input and returns a list of recipe suggestions.
 * - suggestRecipesFromIngredients - The main function that triggers the recipe suggestion flow.
 * - SuggestRecipesFromIngredientsInput - The input type for the suggestRecipesFromIngredients function.
 * - SuggestRecipesFromIngredientsOutput - The output type for the suggestRecipesFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRecipesFromIngredientsInputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients detected in the refrigerator.'),
});
export type SuggestRecipesFromIngredientsInput = z.infer<
  typeof SuggestRecipesFromIngredientsInputSchema
>;

const RecipeSchema = z.object({
  name: z.string().describe('The name of the recipe.'),
  description: z.string().describe('A short description of the recipe.'),
  ingredients: z.array(z.string()).describe('A list of ingredients required for the recipe.'),
  steps: z.array(z.string()).describe('A list of steps to prepare the recipe.'),
});

const SuggestRecipesFromIngredientsOutputSchema = z.array(RecipeSchema).describe('A list of suggested recipes.');

export type SuggestRecipesFromIngredientsOutput = z.infer<
  typeof SuggestRecipesFromIngredientsOutputSchema
>;

export async function suggestRecipesFromIngredients(
  input: SuggestRecipesFromIngredientsInput
): Promise<SuggestRecipesFromIngredientsOutput> {
  return suggestRecipesFromIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRecipesFromIngredientsPrompt',
  input: {schema: SuggestRecipesFromIngredientsInputSchema},
  output: {schema: SuggestRecipesFromIngredientsOutputSchema},
  prompt: `You are a recipe suggestion AI. Given a list of ingredients, you will suggest 3-5 recipes that the user can cook using only the detected items.

Each recipe should include:
- recipe name
- short description
- ingredients
- simple steps

Ingredients: {{{ingredients}}}

Recipes: `,
});

const suggestRecipesFromIngredientsFlow = ai.defineFlow(
  {
    name: 'suggestRecipesFromIngredientsFlow',
    inputSchema: SuggestRecipesFromIngredientsInputSchema,
    outputSchema: SuggestRecipesFromIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
