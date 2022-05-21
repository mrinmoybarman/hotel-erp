import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { CreateOptionDto } from './dto/create-option.dto';
import { OptionRepository } from './option.repository';

@Injectable()
export class OptionsService {
  
  constructor(
    @InjectRepository(OptionRepository)
    private optionRepository:OptionRepository,
  ){}

  async create(option: CreateOptionDto, question:Question) {
    const newOption = await this.optionRepository.save({
      text: option.text,
      isCorrect: option.isCorrect,
    });

    question.options =  [...question.options, newOption];
    await question.save();

    return newOption;

  }

  // findAll() {
  //   return `This action returns all options`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} option`;
  // }

  // update(id: number, updateOptionDto: UpdateOptionDto) {
  //   return `This action updates a #${id} option`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} option`;
  // }

}
