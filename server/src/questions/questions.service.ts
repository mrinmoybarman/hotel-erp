import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionsService {
  
  constructor(@InjectRepository(QuestionRepository) private questionRepository:QuestionRepository){}

  // async create(question: CreateQuestionDto, quiz:Quiz):Promise<Question> {
  //   const newQuestion =  await this.questionRepository.save({
  //     question:question.question
  //   });

  //   quiz.questions = [ ...quiz.questions, newQuestion ];
  //   await quiz.save();

  //   return newQuestion;
  // }

  async create(
    question: CreateQuestionDto,
    quiz: Quiz,
  ): Promise<Question> {
    const newQuestion = await this.questionRepository.save({
      question: question.question,
    });

    quiz.questions = [...quiz.questions, newQuestion];
    await quiz.save();

    return newQuestion;
  }

  async findAll() {
    const result = await this.questionRepository.find({relations:['quiz','options']});
    if(result === undefined){
      throw new BadRequestException;
    }
    return result;

  }

  async findOne(id: number):Promise<Question> {
    const result = await this.questionRepository.findOne(id,{relations:['quiz','options']});
    if(result === undefined){
      throw new BadRequestException;
    }
    return result;

  }

  async update(id: number, updateQuestion: CreateQuestionDto) {
    const origin = await this.findOne(id);
    console.log(origin);
    const obj = {...updateQuestion,id};
    const update = await this.questionRepository.save(obj)
    return update;
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    const ok = await this.questionRepository.delete(id);
    // console.log(ok.affected);
    if(ok.affected === 0){
      throw new BadRequestException;
    }
    return {status:'Successfully Deleted !', data};
  }


}
