import { Module } from '@nestjs/common';
// import { SurveyResolver } from './survey.resolver';
// import { SurveyService } from './survey.service';
import { DatabaseModule } from '../database/database.module';
import { surveyProviders } from './provider/survey.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...surveyProviders],
})
export class SurveyModule {}
