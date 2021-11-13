import { Injectable, Logger } from '@nestjs/common';
import { SurveySchema } from 'src/common/types';
import survey from "./survey.json";

@Injectable()
export class ParserService {
    private readonly logger = new Logger(ParserService.name);

    private storeSurvey(surveySchema: SurveySchema) {
        this.logger.log("JSON STORED IN DB! :)))");
    }

    private parseSurvey() {
        return SurveySchema.parse(survey);
    }

    parse() {
        const surveySchema = this.parseSurvey();
        this.storeSurvey(surveySchema);
    }
}