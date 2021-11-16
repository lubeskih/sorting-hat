import { Module } from "@nestjs/common";
import { MatrixService } from "src/matrix/matrix.service";
import { PrismaService } from "src/prisma/prisma.service";
import { SurveyService } from "src/survey/survey.service";
import { UserService } from "src/user/user.service";
import { ParserService } from "./service/parser.service"

@Module({
    imports: [],
    providers: [
      ParserService,
      UserService,
      MatrixService,
      SurveyService,
      PrismaService],
    controllers: [],
    exports: [ParserService]
  })
  export class ParserModule {}