import { Option } from "src/options/entities/option.entity";
import { Quiz } from "src/quiz/entities/quiz.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('questions')
export class Question extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'varchar',
    })
    question:string;

    @ManyToOne(()=> Quiz, (quiz) =>quiz.questions)
    quiz:Quiz;

    @OneToMany(() => Option, (option) => option.question)
    options:Option[];

} 
