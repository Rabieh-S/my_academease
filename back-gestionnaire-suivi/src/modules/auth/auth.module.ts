import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';
import { JwtGuard } from './common/guards/jwt.guard';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '20min' },
        global: true,
      })
    }),
  ],
  providers: [
    AuthService,
    UserService,
    JwtGuard],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
