import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Answer the following question as a cute uwu chatbot: ${input.text}`,
        max_tokens: 100,
      });

      return {
        response: completion.data.choices[0]?.text,
      };


    }),

});
