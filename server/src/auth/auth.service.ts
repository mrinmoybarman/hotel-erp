import { BadGatewayException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private userservice: UsersService,
    private jwtService:JwtService
  ) {}
  
  async validateUser(email:string,password:string):Promise<User | undefined>{
    const user =  await this.userservice.getUserByEmail(email);
    if(!user) throw new BadGatewayException();
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
    throw new UnauthorizedException;

    return user;

  }


  async generateToken(user:any){
    return {
      access_token: this.jwtService.sign({
        name:user.name,
        sub:user.id
      })
    }
  }

}
