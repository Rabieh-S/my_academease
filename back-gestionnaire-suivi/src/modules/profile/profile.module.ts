import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absence } from '../absence/entities/absence.entity';
import { Quizz } from '../quizz/entities/quizz.entity';
import { Result } from '../result/entities/result.entity';
import { User } from '../user/entities/user.entity';
import { Center } from '../center/entities/center.entity';
import { Promotion } from '../promotion/entities/promotion.entity';
import { Lesson } from '../lesson/entities/lesson.entity';
import { Document } from '../document/entities/document.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Absence, Quizz, Result, User, Center, Promotion, Lesson, Document, Profile])],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService]
})
export class ProfileModule { }
