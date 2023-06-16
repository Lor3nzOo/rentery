import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { RentalModule } from './rental/rental.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';

@Module({
  imports: [AuthModule, RentalModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'upload'),
    serveRoot: '/uploads'
  })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
