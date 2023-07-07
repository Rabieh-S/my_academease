import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absence } from '../absence/entities/absence.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Lesson } from '../lesson/entities/lesson.entity';
import { Promotion } from './entities/promotion.entity';
import { Document } from '../document/entities/document.entity';
import { Center } from '../center/entities/center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Absence, Profile, Lesson, Promotion, Document, Center])],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService]
})
export class PromotionModule { }
