import {Length, IsNotEmpty } from 'class-validator';

export class CreateQuizDto {
    @IsNotEmpty({message:'the quiz should have a title'})
    @Length(2,255)
    title:string;

    @IsNotEmpty()
    description:string;

}
