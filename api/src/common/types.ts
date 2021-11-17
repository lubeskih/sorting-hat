import * as z from "zod";

// Survey related
export const InputTypes = z.enum(["radio_button", "normal_button"]);
export type InputTypes = z.infer<typeof InputTypes>;

export const PossibleSurveyAnswers = z.object({
  value: z.string(),
  parentQuestionId: z.number(),
  nextQuestionId: z.number().optional().or(z.null()),
});
export type PossibleSurveyAnswers = z.infer<typeof PossibleSurveyAnswers>;

export const SurveyQuestion = z.object({
  value: z.string(),
  answerChoice: InputTypes,
  parentSurveyId: z.number(),
  answers: z.array(PossibleSurveyAnswers),
});
export type SurveyQuestion = z.infer<typeof SurveyQuestion>;

export const Survey = z.array(
  z.object({
    surveyTitle: z.string(),
    scoreMatrixId: z.number(),
    questions: z.array(SurveyQuestion),
  })
)
export type Survey = z.infer<typeof Survey>;

// Matrix related
export const AnswerWeight = z.object({
  answerId: z.number(),
  matrixId: z.number(),
  score: z.array(z.number()),
})
export type AnswerWeight = z.infer<typeof AnswerWeight>

export const Matrix = z.array(
  z.object({
    surveyTitle: z.string(),
    surveyMatrix: z.array(AnswerWeight),
  })
)
export type Matrix = z.infer<typeof Matrix>;
