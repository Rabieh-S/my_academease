import { Module } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { QuizzController } from './quizz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../question/entities/question.entity';
import { Result } from '../result/entities/result.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Lesson } from '../lesson/entities/lesson.entity';
import { Quizz } from './entities/quizz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Result, Profile, Lesson, Quizz])],
  providers: [QuizzService],
  controllers: [QuizzController]
})
export class QuizzModule { }
