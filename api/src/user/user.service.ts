import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUser, UpsertUserAnswer } from "src/graphql";
import { v4 as uuidv4 } from "uuid";

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
}