import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionsService {
  
  constructor(@InjectRepository(QuestionRepository) private questionRepository:QuestionRepository){}

  async create(question: CreateQuestionDto,quiz:Quiz):Promise<Question> {
    const newQuestion =  await this.questionRepository.save({
      question:question.question
    });

    quiz.questions = [ ...quiz.questions, newQuestion ];
    await quiz.save();

    return newQuestion;
  }

  // findAll() {
  //   return `This action returns all questions`;
  // }

  async findOne(id: number):Promise<Question> {
    return await this.questionRepository.findOne(id,{relations:['quiz', 'options']});
  }

  // update(id: number, updateQuestionDto: UpdateQuestionDto) {
  //   return `This action updates a #${id} question`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} question`;
  // }
}
