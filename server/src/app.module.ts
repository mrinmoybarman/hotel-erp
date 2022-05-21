import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import {TypeOrmModule} from '@nestjs/typeorm';
import { typeOrmAsyncConfig} from 'src/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    QuizModule, // which contain multiple controller and services nested
    UsersModule,
    AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
