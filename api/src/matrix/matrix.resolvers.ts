import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CreateAnswerScore, CreateMatrix } from "src/graphql";
import { MatrixService } from "./matrix.service";

@Resolver("Matrix")
export class MatrixResolvers {
    constructor(private readonly matrixService: MatrixService) {}

    @Mutation("createNewMatrix")
    async create(@Args('input') args: CreateMatrix) {
        return this.matrixService.createNewMatrix(args);
    }

    @Mutation("createNewAnswerScore")
    async createNewAnswerScore(@Args("input") args: CreateAnswerScore) {
        return this.matrixService.createNewAnswerScore(args);
    }
}