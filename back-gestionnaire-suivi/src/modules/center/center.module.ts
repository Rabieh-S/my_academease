import { Module } from '@nestjs/common';
import { CenterService } from './center.service';
import { CenterController } from './center.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Center } from './entities/center.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Promotion } from '../promotion/entities/promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Center, Profile, Promotion])],
  providers: [CenterService],
  controllers: [CenterController]
})
export class CenterModule { }
