'use server';

/**
 * @fileOverview Analyzes the user's quiz answers to generate a compatibility score, title, and quote.
 *
 * - analyzePersonality - A function that handles the personality analysis process.
 * - AnalyzePersonalityInput - The input type for the analyzePersonality function.
 * - AnalyzePersonalityOutput - The return type for the analyzePersonality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePersonalityInputSchema = z.object({
  answers: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .describe(
      'An array of quiz questions and the user typed answer for each question.'
    ),
});
export type AnalyzePersonalityInput = z.infer<
  typeof AnalyzePersonalityInputSchema
>;

const AnalyzePersonalityOutputSchema = z.object({
  score: z
    .number()
    .describe('The compatibility score percentage (0-100) based on the answers.'),
  title: z
    .string()
    .describe(
      "A very short (1-2 words) and quirky personality title. Example: 'Chaos Coordinator'."
    ),
  quote: z
    .string()
    .describe(
      "A creative, witty, and quirky quote (1-2 sentences) that captures the user's personality. Example: 'Embrace the chaos; the syllabus is merely a suggestion.'"
    ),
});
export type AnalyzePersonalityOutput = z.infer<
  typeof AnalyzePersonalityOutputSchema
>;

export async function analyzePersonality(
  input: AnalyzePersonalityInput
): Promise<AnalyzePersonalityOutput> {
  return analyzePersonalityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePersonalityPrompt',
  input: {schema: AnalyzePersonalityInputSchema},
  output: {schema: AnalyzePersonalityOutputSchema},
  prompt: `You are the UCEK Vibe-o-Meter, an AI that assesses a person's compatibility with the unique, chaotic, and self-driven culture of University College of Engineering Kariavattom (UCEK).

Your task is to analyze a prospective student's answers to a quiz. Based on their responses and the context provided about UCEK, you must:
1. Calculate a **Compatibility Score** from 0 to 100.
2. Generate a quirky **Vibe Title**.
3. Generate a unique **Vibe Quote**.

**UCEK CONTEXT:**
UCEK (University College of Engineering Kariavattom) is the only engineering college under Kerala University (not KTU) and is located inside the massive 400-acre Kariavattom campus in Trivandrum. It’s relatively unknown, with a very laid-back atmosphere. The college shares space with university departments and has plenty of natural hangout spots.

The infrastructure is outdated — labs use Windows 7 systems with DOSBox and Notepad for coding. Classrooms and benches are old, and we only have one good seminar hall. The placement cell is barely functional, and campus placements are rare.

Exams and results are frequently delayed. Unlike KTU where results come in a month, ours can take many months — even up to a year. This delay affects students with backlogs, as they may not be able to graduate on time.

Despite these drawbacks, there’s a lot of freedom. Attendance rules (75%) are rarely enforced, and most teachers are friendly and supportive. No one forces you to attend every class, and it’s easy to explore outside opportunities.

The college has many active communities like GTech MuLearn, IEDC, IEEE, FOSS, music and dance clubs, etc., which organize hackathons, workshops, and fests regularly. These communities give good exposure and hands-on experience. Technopark is nearby, and many students and alumni work or intern there, which helps with industry connections and referrals.

There are three canteens (two university, one college-owned), and the food is affordable and Kerala-style. Meals cost ₹25, fish fry starts at ₹20, and the canteen uncle is known for his rants and character.

Our startup culture used to be strong, but the university administration has created controversies. Our annual tech fest RenVnZa was a disaster financially last time, with mixed media attention. However, other events like workshops and flea markets were well-received.

Despite all the flaws, the college has a strong community and student bond. Since the number of students is small, everyone knows each other. There’s a collaborative atmosphere, and the culture supports doing your own thing. Many students improve personally and professionally due to the exposure, freedom, and connections they get here.

**The ideal UCEK student values freedom, community, and self-driven growth over academics, placements, or strict systems.**

**ANALYSIS GUIDELINES:**

*   **Score Calculation:**
    *   **High scores (75-100):** For answers showing independence, self-learning, proactivity, community focus, tolerance for chaos/disorganization, and a sense of humor about the flaws. They see the lack of structure as an opportunity.
    *   **Medium scores (50-74):** For answers that are mixed. They might be adaptable but still desire some structure. They show interest in clubs but are also concerned about placements or timely results.
    *   **Low scores (0-49):** For answers showing a strong need for structure, dependence on teachers, a primary focus on guaranteed placements and academics, and frustration with delays or disorganization.
*   **Vibe Title:** Must be 1-2 words (articles like 'The' are okay). Make it cool and quirky, like a Spotify Wrapped title.
*   **Vibe Quote:** Must be a creative, witty, and memorable piece of advice (1-2 sentences).
*   **IMPORTANT:** Do NOT mention 'UCEK' in the title or quote.

**User's Quiz Answers:**
{{#each answers}}
- Question: {{this.question}}
  - Answer: {{this.answer}}
{{/each}}

You must respond with a valid JSON object that conforms to the following Zod schema:
\`\`\`json
{{{jsonSchema}}}
\`\`\`
`,
});

const analyzePersonalityFlow = ai.defineFlow(
  {
    name: 'analyzePersonalityFlow',
    inputSchema: AnalyzePersonalityInputSchema,
    outputSchema: AnalyzePersonalityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
