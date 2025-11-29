'use server';

/**
 * @fileOverview Detects ingredients from an image of a refrigerator.
 *
 * - detectIngredientsFromImage - A function that identifies ingredients from an image.
 * - DetectIngredientsFromImageInput - The input type for the detectIngredientsFromImage function.
 * - DetectIngredientsFromImageOutput - The return type for the detectIngredientsFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectIngredientsFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the refrigerator's contents, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectIngredientsFromImageInput = z.infer<
  typeof DetectIngredientsFromImageInputSchema
>;

const DetectIngredientsFromImageOutputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients detected in the refrigerator.'),
});
export type DetectIngredientsFromImageOutput = z.infer<
  typeof DetectIngredientsFromImageOutputSchema
>;

export async function detectIngredientsFromImage(
  input: DetectIngredientsFromImageInput
): Promise<DetectIngredientsFromImageOutput> {
  return detectIngredientsFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectIngredientsFromImagePrompt',
  input: {schema: DetectIngredientsFromImageInputSchema},
  output: {schema: DetectIngredientsFromImageOutputSchema},
  prompt: `You are an AI assistant helping users identify ingredients in their refrigerator.

  Analyze the image of the refrigerator contents and identify all the food items present.

  Photo: {{media url=photoDataUri}}

  Respond with a JSON object containing a list of the detected ingredients.
  `,
});

const detectIngredientsFromImageFlow = ai.defineFlow(
  {
    name: 'detectIngredientsFromImageFlow',
    inputSchema: DetectIngredientsFromImageInputSchema,
    outputSchema: DetectIngredientsFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
