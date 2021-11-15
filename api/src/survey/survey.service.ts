import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Survey, Question, Answer } from "@prisma/client";
import { CreateAnswer, CreateQuestion, CreateSurvey } from "src/graphql";

@Injectable()
export class SurveyService {
    constructor(private prisma: PrismaService) {}
    
    // create survey
    async createNewSurvey(input: CreateSurvey): Promise<Survey> {
        return this.prisma.survey.create({
            data: {
                surveyTitle: input.surveyTitle,
                scoreMatrixId: parseInt(input.scoreMatrixId)
            }
        })
    }

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

    // create question
    async createNewQuestion(input: CreateQuestion): Promise<Question> {
        return this.prisma.question.create({
            data: {
                answerChoice: input.answerChoice,
                value: input.value,
                parentSurveyId: parseInt(input.parentSurveyId)
            }
        })
    }

    // get all questions
    async allQuestions(surveyId: string): Promise<Question[]> {
        return this.prisma.question.findMany({
            where: {
                parentSurveyId: parseInt(surveyId)
            },
            include: {
                answers: true
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

    // create new answer to a question
    async createNewAnswer(input: CreateAnswer): Promise<Answer> {
        return this.prisma.answer.create({
            data: {
                parentQuestionId: parseInt(input.parentQuestionId),
                value: input.value,
                nextQuestionId: parseInt(input.nextQuestionId)
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