import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Matrix } from "@prisma/client";
import { Score, CreateAnswerScore, CreateMatrix } from "src/graphql";

@Injectable()
export class MatrixService {
    constructor(private prisma: PrismaService) {}

    // create new matrix
    async createNewMatrix(input: CreateMatrix): Promise<Matrix> {
        return this.prisma.matrix.create({
            data: input
        })
    }

    async createNewAnswerScore(input: CreateAnswerScore) {
        return this.prisma.score.create({
            data: {
                matrixId: parseInt(input.matrixId),
                scoreArray: input.scoreArray,
                answerId: parseInt(input.answerId)
            }
        })
    }
}