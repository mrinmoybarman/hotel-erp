import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';


@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({
    description:'Primary key as User Id generated',
    example:'1'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description:'User Full Name',
    example:'John Doe'
  })
  @Column()
  name: string;

  @ApiProperty({
    description:'User email Id',
    example:'john@doe.com'
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({
    description:'User Password hashed',
    example:'$2b$10$BYy2T.D/pU1hYZeaxzTgZeFD639x6u7z0.RG7zDsQ1FsUE7LgjTha'
  })
  @Column()
  password: string;

  @ApiProperty({
    description:'When User was Created',
    example:'2022-05-22T15:01:29.589Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description:'When User was Updated',
    example:'2022-05-22T15:01:29.589Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
