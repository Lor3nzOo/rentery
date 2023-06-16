import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { MulterModule } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'http://localhost:5173',
    credentials: true
  })
  app.use(cookieParser());
  MulterModule.register({
    dest: './upload',
  });
  await app.listen(3000);
}
bootstrap();
