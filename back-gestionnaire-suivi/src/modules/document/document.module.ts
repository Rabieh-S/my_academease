import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Promotion } from '../promotion/entities/promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Profile, Promotion])],
  providers: [DocumentService],
  controllers: [DocumentController]
})
export class DocumentModule { }
