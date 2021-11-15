import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Survey, Question, Answer } from "@prisma/client";

@Injectable()
export class SurveyService {
    constructor(private prisma: PrismaService) {}
    
    // get all surveys
    async allSurveys(): Promise<Survey[]> {
        return this.prisma.survey.findMany({});
    }

    // get single survey
    async singleSurvey(id: string): Promise<Survey | null> {
        return this.prisma.survey.findUnique({
            where: {
                id: parseInt(id)
            }
        })
    }

    // get all questions
    async allQuestions(surveyId: string): Promise<Question[]> {
        return this.prisma.question.findMany({
            where: {
                parentSurveyId: parseInt(surveyId)
            }
        })
    }

    // get single question
    async singleQuestion(id: string): Promise<Question | null> {
        return this.prisma.question.findUnique({
            where: {
                id: parseInt(id)
            }
        })
    }

    // get all answers from a survey
    async allAnswers(questionId: string): Promise<Answer[]> {
        return this.prisma.answer.findMany({
            where: {
                parentQuestionId: parseInt(questionId)
            }
        });
    }

    // get a single answer given an id
    async singleAnswer(answerId: string): Promise<Answer | null> {
        return this.prisma.answer.findUnique({
            where: {
                id: parseInt(answerId)
            }
        })
    }
}