import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUser, UpsertUserAnswer, UserIsDoneWithSurvey } from "src/graphql";
import { v4 as uuidv4 } from "uuid";
import { stringToList } from "src/common/helpers";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    // create new user
    async createNewUser(input: CreateUser) {
        const { whichSurveyIsTaking, currentQuestionId } = input;
        const uid = uuidv4();

        return this.prisma.user.create({
            data: {
                sessionToken: uid,
                whichSurveyIsTaking: parseInt(whichSurveyIsTaking),
                currentQuestionId: parseInt(currentQuestionId),
            }
        })
    }

    // create new user answer
    async createNewUserAnswer(input: UpsertUserAnswer) {
        // bad way of handling it!
        // needs to be refactored.
        await this.prisma.userAnswer.deleteMany({
            where: {
                AND: [{ questionId: parseInt(input.questionId)}, { userId: parseInt(input.userId) }]
            }
        })

        return this.prisma.userAnswer.create({
            data: {
                userId: parseInt(input.userId),
                answerId: parseInt(input.answerId),
                selected: input.selected,
                questionId: parseInt(input.questionId)
            }
        })
    }

    async userIsDoneWithSurvey(input: UserIsDoneWithSurvey){
        await this.prisma.user.update({
            where: {
                id: parseInt(input.userId),
            },
            data: {
                isDone: input.isDone
            }
        });

        // [TODO] remove tokens, mokens..
    }

    async getUserBySessionToken(sessionToken: string) {
        return this.prisma.user.findFirst({
            where: {
                sessionToken: sessionToken
            }
        })
    }

    async getUserAnswerScores(sessionToken: string) {
        const user = await this.getUserBySessionToken(sessionToken);

        const userAnswers = await this.prisma.userAnswer.findMany({
            where: {
                userId: user.id,
            }
        });
        const answerIds = userAnswers.map(m => m.answerId);
        // [ { ..., scoreArray: "100,0,100,0"}, ... ]
        const scores = await this.prisma.score.findMany({
            where: {
                id: { in: answerIds }
            }
        });

        return scores.map(s => stringToList(s.scoreArray)); // [ [ 100, 0, 100, 0 ], [ 0, 100, 0, 100 ] ]
    }
}