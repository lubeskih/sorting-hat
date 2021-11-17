import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParserService } from './parser/service/parser.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const tasksService = app.get(TasksService);
  const parserService = app.get(ParserService);
  await parserService.seed();

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
