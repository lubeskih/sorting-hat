import { Injectable, Logger } from '@nestjs/common';
import { SurveySchema } from 'src/common/types';
import survey from "./survey.json";

@Injectable()
export class ParserService {
    private readonly logger = new Logger(ParserService.name);

    private storeSurvey() {
        this.logger.log("JSON STORED IN DB! :)))");
    }

    private parseSurvey() {
        return SurveySchema.parse(survey);
    }

    parse() {
        this.parseSurvey();
        this.storeSurvey();
    }
}