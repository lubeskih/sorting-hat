import { Module } from '@nestjs/common';
import { GraphQLModule  } from '@nestjs/graphql';
import { MatrixModule } from './matrix/matrix.module';

import { ParserModule } from './parser/parser.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql']
    }),
    ParserModule,
    SurveyModule,
    MatrixModule
  ],
})
export class AppModule {}