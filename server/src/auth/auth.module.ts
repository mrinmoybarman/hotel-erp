import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStretegy } from './local.stretegy';

@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService,LocalStretegy]
})
export class AuthModule {}
