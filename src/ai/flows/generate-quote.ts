'use server';

/**
 * @fileOverview Generates a quirky quote based on quiz responses.
 *
 * - generateQuote - A function that generates a quote based on the quiz answers.
 * - GenerateQuoteInput - The input type for the generateQuote function.
 * - GenerateQuoteOutput - The return type for the generateQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuoteInputSchema = z.object({
  quizResponses: z
    .array(z.number())
    .describe('An array of numbers, each representing the score for a quiz question.'),
});

export type GenerateQuoteInput = z.infer<typeof GenerateQuoteInputSchema>;

const GenerateQuoteOutputSchema = z.object({
  quote: z.string().describe('A unique and quirky quote generated based on the quiz responses.'),
});

export type GenerateQuoteOutput = z.infer<typeof GenerateQuoteOutputSchema>;

export async function generateQuote(input: GenerateQuoteInput): Promise<GenerateQuoteOutput> {
  return generateQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuotePrompt',
  input: {schema: GenerateQuoteInputSchema},
  output: {schema: GenerateQuoteOutputSchema},
  prompt: `You are a creative quote generator specializing in creating quirky and funny quotes about college life at UCEK.

  Given the following quiz responses (scores for each question), generate a unique and relatable quote that captures the essence of the user's UCEK personality.

  Quiz Responses: {{{quizResponses}}}

  The quote should be no more than 20 words.
  `,
});

const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
    inputSchema: GenerateQuoteInputSchema,
    outputSchema: GenerateQuoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
