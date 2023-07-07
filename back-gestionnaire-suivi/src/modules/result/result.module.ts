import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { Quizz } from '../quizz/entities/quizz.entity';
import { Result } from './entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Quizz, Result])],
  providers: [ResultService],
  controllers: [ResultController]
})
export class ResultModule { }
