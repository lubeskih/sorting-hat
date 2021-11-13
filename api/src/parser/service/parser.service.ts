import { Injectable, Logger } from '@nestjs/common';
import { Survey, Matrix } from 'src/common/types';
import survey from "./survey.json";

@Injectable()
export class ParserService {
    private readonly logger = new Logger(ParserService.name);

    private storeSurvey(surveySchema: Survey) {
        this.logger.log("JSON STORED IN DB! :)))");
    }

    private parseSurvey() {
        return Survey.parse(survey);
    }

    parse() {
        const surveySchema = this.parseSurvey();
        this.storeSurvey(surveySchema);
    }
}