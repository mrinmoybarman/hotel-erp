import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { ObjectID } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { QuizRepository } from './quiz.repository';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(QuizRepository) private quizRepository:QuizRepository,
  ){}

  async create(quiz: CreateQuizDto) {
    return await this.quizRepository.save(quiz);
  }

  async findAll():Promise<Quiz[]> {
    // return await this.quizRepository.find();
    // or
    //custom query builder
    return await this.quizRepository.createQueryBuilder('q')
    .leftJoinAndSelect('q.questions','qt')
    .leftJoinAndSelect('qt.options','o')
    // .skip  set offset (LIMIT from))
    // .take() number of row i want
    // .getManyAndCount(); //also returns the number of row in the table
    .getMany();
  }

  async findOne(id: number):Promise<any> {
    const result = await this.quizRepository.findOne(id,{relations:['questions','questions.options']});
    if(result === undefined){
      throw new BadRequestException;
    }
    return result;
  }

  async update(id: number, updatedQuiz: CreateQuizDto) {
    const origin = await this.findOne(id);
    console.log(origin);
    const obj = {...updatedQuiz,id};
    const update = await this.quizRepository.save(obj)
    return update;
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    const ok = await this.quizRepository.delete(id);
    console.log(ok.affected);
    if(ok.affected === 0){
      throw new BadRequestException;
    }
    return {status:'Successfully Deleted !', data};
  }

}
