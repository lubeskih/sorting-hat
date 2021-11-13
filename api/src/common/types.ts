import * as z from "zod";

// Survey related
export const InputTypes = z.enum(["radio_button", "normal_button"]);
export type InputTypes = z.infer<typeof InputTypes>;

export const PossibleSurveyAnswers = z.object({
  answerId: z.string(),
  value: z.string(),
  nextQuestionId: z.string().optional(),
});
export type PossibleSurveyAnswers = z.infer<typeof PossibleSurveyAnswers>;

export const SurveyQuestion = z.object({
  questionId: z.string(),
  value: z.string(),
  answerChoice: InputTypes,
  answers: z.array(PossibleSurveyAnswers),
});
export type SurveyQuestion = z.infer<typeof SurveyQuestion>;

export const Survey = z.object({
  surveyName: z.string(),
  surveyId: z.string(),
  questions: z.array(SurveyQuestion),
});
export type Survey = z.infer<typeof Survey>;

// Matrix related
export const AnswerWeight = z.object({
  answerId: z.string(),
  score: z.array(z.number()),
})
export type AnswerWeight = z.infer<typeof AnswerWeight>

export const Matrix = z.object({
  surveyId: z.string(),
  surveyMatrix: z.array(AnswerWeight),
})
export type Matrix = z.infer<typeof Matrix>;