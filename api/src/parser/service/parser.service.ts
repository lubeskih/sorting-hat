import { Injectable, Logger } from '@nestjs/common';
import { Matrix, Survey } from 'src/common/types';
import { CreateAnswer, CreateAnswerScore, CreateMatrix, CreateQuestion, CreateSurvey } from 'src/graphql';
import { MatrixService } from 'src/matrix/matrix.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SurveyService } from 'src/survey/survey.service';

import * as hp_survey from "./hp_survey.json";

// notes on how to seed; create in order
// 1. matrix
// 2. survey
// 3. questions
// 4. answers
// 5. scores for answers
// 6. User
// 7. UserAnswer

@Injectable()
export class ParserService {
    constructor(
        private surveyService: SurveyService,
        private matrixService: MatrixService,
        private prisma: PrismaService
    ) {}

    private readonly logger = new Logger(ParserService.name);

    async dbSeeded() {
        return (await this.prisma.score.count() > 0);
    }

    async seed() {
        this.logger.log("[+] Running a database seed.")

        if (await this.dbSeeded()) {
            this.logger.log("[+] Database already seeded.")
            return;
        }

        // validate
        const matrix = Matrix.parse(hp_survey.matrix);
        const survey = Survey.parse(hp_survey.survey);

        // extract
        let matrices: CreateMatrix[] = []; 
        let scores: CreateAnswerScore[] = [];
        let surveys: CreateSurvey[] = [];
        let survey_questions: CreateQuestion[] = [];
        let survey_question_answers: CreateAnswer[] = [];

        matrix.forEach(matrix => {
            const m: CreateMatrix = {
                surveyTitle: matrix.surveyTitle,
                bias: matrix.bias.toString()
            };

            matrices.push(m);

            matrix.surveyMatrix.forEach(score => {
                const s: CreateAnswerScore = {
                    answerId: score.answerId.toString(),
                    matrixId: score.matrixId.toString(),
                    scoreArray: score.score.toString()
                }

                scores.push(s);
            })
        });

        survey.forEach(survey => {
            const s: CreateSurvey = {
                surveyTitle: survey.surveyTitle,
                scoreMatrixId: survey.scoreMatrixId.toString()
            }

            surveys.push(s);

            survey.questions.forEach(question => {
                const q: CreateQuestion = {
                    answerChoice: question.answerChoice,
                    parentSurveyId: question.parentSurveyId.toString(),
                    value: question.value,
                    lastQuestion: question.lastQuestion
                }

                survey_questions.push(q);

                question.answers.forEach(answer => {
                    const a: CreateAnswer = {
                        nextQuestionId: answer.nextQuestionId.toString(),
                        parentQuestionId: answer.parentQuestionId.toString(),
                        value: answer.value,
                    }

                    survey_question_answers.push(a)
                })
            })
        });

        this.logger.log("[+] Seeding matrices.");
        await this.storeMatrix(matrices);

        this.logger.log("[+] Seeding the surveys.");
        await this.storeSurvey(surveys);

        this.logger.log("[+] Seeding the questions.");
        await this.storeQuestions(survey_questions);

        this.logger.log("[+] Seeding the question answers.");
        await this.storeAnswers(survey_question_answers);

        this.logger.log("[+] Seeding the scores.");
        await this.storeAnswerScores(scores);

        this.logger.log("[+] Done.")
    }

    async storeAnswerScores(scores: CreateAnswerScore[]) {
        // return Promise.all(scores.map(score => this.matrixService.createNewAnswerScore(score)));
        for (let score of scores) {
            await this.matrixService.createNewAnswerScore(score);
        }
    }

    async storeAnswers(survey_question_answers: CreateAnswer[]) {
        // return Promise.all(survey_question_answers.map(sqa => this.surveyService.createNewAnswer(sqa)))
        for (let sqa of survey_question_answers) {
            await this.surveyService.createNewAnswer(sqa);
        }
    }
    
    async storeQuestions(survey_questions: CreateQuestion[]) {
        // return Promise.all(survey_questions.map(sq => this.surveyService.createNewQuestion(sq)))
        for (let sq of survey_questions) {
            await this.surveyService.createNewQuestion(sq);
        }
    }

    async storeSurvey(surveys: CreateSurvey[]) {
        // return Promise.all(surveys.map(s => this.surveyService.createNewSurvey(s)))
        for (let s of surveys) {
            await this.surveyService.createNewSurvey(s);
        }
    }

    async storeMatrix(matrices: CreateMatrix[]) {
        // return Promise.all(matrices.map(m => this.matrixService.createNewMatrix(m)));
        for (let m of matrices) {
            await this.matrixService.createNewMatrix(m)
        }
    }
}