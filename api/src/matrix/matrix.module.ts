import { Module } from "@nestjs/common";

import { MatrixResolvers } from "./matrix.resolvers";
import { MatrixService } from "./matrix.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    providers: [MatrixResolvers, MatrixService, PrismaService],
})
export class MatrixModule {}