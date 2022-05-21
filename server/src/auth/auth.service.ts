import { BadGatewayException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from  'bcrypt';

@Injectable()
export class AuthService {
  
  constructor(private userService:UsersService){}

  async validateUser(email:string,password:string) : Promise<User | undefined>{
    const user = await this.userService.getUserByEmail(email);
    if(!user) throw new BadGatewayException();

    if(!bcrypt.compare(password,user.password))
      throw new UnauthorizedException();

    return user;
  }
}
