import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { Quizz } from '../quizz/entities/quizz.entity';
import { Absence } from '../absence/entities/absence.entity';
import { Promotion } from '../promotion/entities/promotion.entity';
import { Lesson } from './entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Quizz, Absence, Promotion, Lesson])],
  providers: [LessonService],
  controllers: [LessonController]
})
export class LessonModule { }
