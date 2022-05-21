import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizRepository } from './quiz.repository';
import { QuestionsService } from 'src/questions/questions.service';
import { QuestionRepository } from 'src/questions/question.repository';
import { QuestionsController } from 'src/questions/questions.controller';
import { OptionRepository } from 'src/options/option.repository';
import { OptionsService } from 'src/options/options.service';
import { OptionsController } from 'src/options/options.controller';

@Module({
  controllers: [QuizController,QuestionsController,OptionsController],
  imports:[TypeOrmModule.forFeature([
    QuizRepository,
    QuestionRepository,
    OptionRepository,
  ])],
  providers: [
    QuizService,
    QuestionsService,
    OptionsService,
  ]
})
export class QuizModule {}
