import { Module } from "@nestjs/common";

import { SurveyResolvers } from "./survey.resolvers";
import { SurveyService } from "./survey.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    providers: [SurveyResolvers, SurveyService, PrismaService],
})
export class SurveyModule {}