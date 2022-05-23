import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { MESSAGES, REGEX } from "src/app.utils";

import {ApiProperty} from '@nestjs/swagger';

export class UserRegisterRequestDto{
    @ApiProperty({
        description:'The name of the User',
        example:'Jhon Doe',
    })
    @IsNotEmpty()
    name:string;

    @ApiProperty({
        description:'The email of the User',
        example:'Jhon@Doe.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty({
        description:'The password of the User which will contain a uppercase and a lowercase letter along with a special character and a number',
        example:'Password@123',
    })
    @IsNotEmpty()
    @Length(6,20)
    @Matches(REGEX.PASSWORD_RULE,{message:MESSAGES.PASSWORD_RULE_MESSAGE})
    password:string;

    @ApiProperty({
        description:'The verification of the Password which must be same as the password',
        example:'Password@123',
    })
    @IsNotEmpty()
    @Length(6,20)
    @Matches(REGEX.PASSWORD_RULE,{message:MESSAGES.PASSWORD_RULE_MESSAGE})
    confirm:string;
}