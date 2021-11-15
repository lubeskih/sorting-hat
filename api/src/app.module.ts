import { Module } from '@nestjs/common';
import { GraphQLModule  } from '@nestjs/graphql';

import { ParserModule } from './parser/parser.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql']
    }),
    ParserModule,
    SurveyModule
  ],
})
export class AppModule {}