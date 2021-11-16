import { Injectable, Logger } from '@nestjs/common';
import { Survey } from 'src/common/types';
import { MatrixService } from 'src/matrix/matrix.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SurveyService } from 'src/survey/survey.service';
import { UserService } from 'src/user/user.service';
import survey from "./sample_survey.json";

@Injectable()
export class ParserService {
    constructor(
        private prismaService: PrismaService,
        private surveyService: SurveyService,
        private matrixService: MatrixService,
        private userService: UserService
    ) {}

    private readonly logger = new Logger(ParserService.name);

    private storeSurvey(surveySchema: Survey) {
        this.logger.log("JSON STORED IN DB! :)))");
    }

    private parseSurvey() {
        return Survey.parse(survey);
    }

    parse() {
        
    }
}