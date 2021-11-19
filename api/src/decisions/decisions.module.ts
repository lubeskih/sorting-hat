import { Module } from "@nestjs/common";
import { MatrixService } from "src/matrix/matrix.service";
import { PrismaService } from "src/prisma/prisma.service";
import { SurveyService } from "src/survey/survey.service";

import { UserService } from "src/user/user.service";
import { DecisionsResolvers } from "./decisions.resolvers";
import { DecisionsService } from "./decisions.service";

@Module({
    providers: [PrismaService, MatrixService, SurveyService, UserService, DecisionsResolvers, DecisionsService],
    // imports: [UserService]
})
export class DecisionsModule {}