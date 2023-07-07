import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entities/question.entity';
import { Quizz } from '../quizz/entities/quizz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Quizz])],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule { }
