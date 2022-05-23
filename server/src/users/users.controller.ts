import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { SETTINGS } from 'src/app.utils';
import { User } from './entities/user.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description:'Created user object as response',
    type:User,
  })
  @ApiBadRequestResponse({
    description:'User Can\'t register',
  })
  async userRegistration(@Body(SETTINGS.VALIDATION_PIPE) register: UserRegisterRequestDto):Promise<User> {
    return await this.usersService.register(register);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

}
