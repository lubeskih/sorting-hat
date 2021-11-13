import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule  } from '@nestjs/graphql';
import { join } from 'path';

import { ParserService } from './parser/service/parser.service';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   debug: false,
    //   playground: true,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    // }),
    ParserService
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
