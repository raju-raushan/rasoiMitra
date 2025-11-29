'use server';

/**
 * @fileOverview Detects if the fridge is empty and suggests a shopping list.
 *
 * - detectEmptyFridgeAndSuggestShoppingList - A function that determines if a fridge is empty based on an image and suggests a shopping list.
 * - DetectEmptyFridgeAndSuggestShoppingListInput - The input type for the detectEmptyFridgeAndSuggestShoppingList function.
 * - DetectEmptyFridgeAndSuggestShoppingListOutput - The return type for the detectEmptyFridgeAndSuggestShoppingList function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectEmptyFridgeAndSuggestShoppingListInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the refrigerator's contents, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectEmptyFridgeAndSuggestShoppingListInput = z.infer<
  typeof DetectEmptyFridgeAndSuggestShoppingListInputSchema
>;

const DetectEmptyFridgeAndSuggestShoppingListOutputSchema = z.object({
  isEmpty: z.boolean().describe('Whether the fridge is empty or not.'),
  shoppingList: z
    .string()
    .describe(
      'A comma-separated list of essential grocery items to restock the fridge with.'
    ),
});
export type DetectEmptyFridgeAndSuggestShoppingListOutput = z.infer<
  typeof DetectEmptyFridgeAndSuggestShoppingListOutputSchema
>;

export async function detectEmptyFridgeAndSuggestShoppingList(
  input: DetectEmptyFridgeAndSuggestShoppingListInput
): Promise<DetectEmptyFridgeAndSuggestShoppingListOutput> {
  return detectEmptyFridgeAndSuggestShoppingListFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectEmptyFridgeAndSuggestShoppingListPrompt',
  input: {schema: DetectEmptyFridgeAndSuggestShoppingListInputSchema},
  output: {schema: DetectEmptyFridgeAndSuggestShoppingListOutputSchema},
  prompt: `You are an AI assistant helping users manage their refrigerators.

  Analyze the image of the refrigerator contents and determine if it is empty or not.

  If the refrigerator appears to be empty, generate a basic shopping list of essential items (milk, eggs, vegetables, bread, etc.).

  Photo: {{media url=photoDataUri}}

  Respond in JSON format.
  `,
});

const detectEmptyFridgeAndSuggestShoppingListFlow = ai.defineFlow(
  {
    name: 'detectEmptyFridgeAndSuggestShoppingListFlow',
    inputSchema: DetectEmptyFridgeAndSuggestShoppingListInputSchema,
    outputSchema: DetectEmptyFridgeAndSuggestShoppingListOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
