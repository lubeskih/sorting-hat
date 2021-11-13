import { Connection } from 'mongoose';
import { ScoreSchema } from '../schema/score.schema';
import { SurveySchema } from '../schema/survey.schema';

export const surveyProviders = [
  {
    provide: 'SCORE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Score', ScoreSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  // {
  //   provide: 'SURVEY_MODEL',
  //   useFactory: (connection: Connection) =>
  //     connection.model('SurveySchema', SurveySchema),
  //   inject: ['DATABASE_CONNECTION'],
  // },
];
