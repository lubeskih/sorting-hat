import * as z from "zod";

export const InputTypes = z.enum(["RADIO", "CHECKBOX", "BUTTON", "TEXT_INPUT"]);
export type InputTypes = z.infer<typeof InputTypes>;

export const SurveyPage = z.object({
  pageName: z.string(),
  route: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      inputs: z.array(
        z.object({
          type: InputTypes,
          value: z.string(),
        })),
    }).strict()
  )
}).strict();
export type SurveyPage = z.infer<typeof SurveyPage>;

export const SurveySchema = z.object({
  survey: z.object({
    pages: z.array(SurveyPage)
  }).strict()
}).strict();
export type SurveySchema = z.infer<typeof SurveySchema>;