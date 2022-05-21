import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { QuizService } from 'src/quiz/quiz.service';

@Controller('question')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService, private quizService:QuizService) {}

  @Post('')
  @UsePipes(ValidationPipe)
  async create(@Body() question: CreateQuestionDto):Promise<Question> {
    const quiz = await this.quizService.findOne(question.quizId); 
    return await this.questionsService.create(question,quiz);
    // return this.questionsService.create(question);
  }

  // @Get()
  // findAll() {
  //   return this.questionsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.questionsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
  //   return this.questionsService.update(+id, updateQuestionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.questionsService.remove(+id);
  // }
}
