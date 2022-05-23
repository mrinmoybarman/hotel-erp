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
  async create(@Body() question: CreateQuestionDto): Promise<Question> {
    const quiz = await this.quizService.findOne(question.quizId);
    return await this.questionsService.create(question, quiz);
  }


  @Get()
  async findAll() {
    return await this.questionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) :Promise<Question>{
    return await this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestion: CreateQuestionDto) {
    return this.questionsService.update(+id, updateQuestion);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }

}
