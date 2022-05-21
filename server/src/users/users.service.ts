import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  async register(register: UserRegisterRequestDto):Promise<User> {
    const user = new User();
    user.name = register.name;
    user.email = register.email;
    user.password = register.password;
    return await user.save();
  }


  async getUserByEmail(email:string):Promise<User | undefined>{
    return await User.findOne({where: {email}});
  }

}
