import { Module } from '@nestjs/common';
import { GraphQLModule  } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './database/database.providers';
import { surveyProviders } from './survey/provider/survey.providers';
import { DatabaseModule } from './database/database.module';
import { SurveyModule } from './survey/survey.module';
import { ParserModule } from './parser/parser.module';
import { SurveyService } from './survey/service/survey.service';
import { SurveyResolver } from './survey/resolver/survey.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './schema.gql',
      playground: true,
    }),
    ParserModule,
    DatabaseModule,
    SurveyModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SurveyService,
    SurveyResolver,
    ...databaseProviders,
    ...surveyProviders,
  ],
})
export class AppModule {}