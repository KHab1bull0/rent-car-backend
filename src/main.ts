import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
// import { AllExceptionsFilter } from './exaptions';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4001, () => {

    console.log("Server is working on port ", 4001);

  });

}

bootstrap();
