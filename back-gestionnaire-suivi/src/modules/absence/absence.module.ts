import { Module } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { Lesson } from '../lesson/entities/lesson.entity';
import { Promotion } from '../promotion/entities/promotion.entity';
import { Absence } from './entities/absence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Lesson, Promotion, Absence])],
  providers: [AbsenceService],
  controllers: [AbsenceController]
})
export class AbsenceModule { }
