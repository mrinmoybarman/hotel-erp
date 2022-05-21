import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  
  @HttpCode(200) //custom status

  @UsePipes(ValidationPipe) // to validate the request (its simply compare body data to the create dto)
  async create(@Body() quizdata: CreateQuizDto):Promise<any> {
    return await this.quizService.create(quizdata);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number):Promise<Quiz> {
    return this.quizService.findOne(id);
  }

  @Get()
  async findAll():Promise<Quiz[]> {
    return await this.quizService.findAll();
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateQuiz: CreateQuizDto) {
    return this.quizService.update(+id, updateQuiz);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }

}
