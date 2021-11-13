import { Module } from "@nestjs/common";
import { ParserService } from "./service/parser.service"
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ParsedEntity } from './models/parsed.entity';

@Module({
    imports: [
    //   TypeOrmModule.forFeature([ParsedEntity]),
    ],
    providers: [ParserService],
    controllers: [],
    exports: [ParserService]
  })
  export class ParserModule {}