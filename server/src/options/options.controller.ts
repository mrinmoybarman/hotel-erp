import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { QuestionsService } from 'src/questions/questions.service';

@Controller('question/options')
export class OptionsController {
  constructor(
    private optionsService: OptionsService, 
    private questionService:QuestionsService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createOption: CreateOptionDto) {
    // return this.optionsService.create(createOptionDto);
    const question = await this.questionService.findOne(
      createOption.questionId
    );

    const option = await this.optionsService.create(createOption, question);

    return {question};
  }

  // @Get()
  // findAll() {
  //   return this.optionsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.optionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
  //   return this.optionsService.update(+id, updateOptionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.optionsService.remove(+id);
  // }

}
