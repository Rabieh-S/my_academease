import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Center } from './entities/center.entity';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { Profile } from '../profile/entities/profile.entity';
import { Promotion } from '../promotion/entities/promotion.entity';

@Injectable()
export class CenterService {
  constructor(
    @InjectRepository(Center)
    private readonly centerRepository: Repository<Center>,
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) { }

  findAll() {
    return this.centerRepository.find();
  }

  async findById(id: string) {
    const center = await this.centerRepository.findOne({ where: { id: id } });
    if (!center) {
      throw new NotFoundException()
    }
    return center;
  }

  async findOne(profileId: string, promotionId: string) {
    const center = await this.centerRepository.findOne({
      relations: ['profile', 'promotions'],
      where: {
        profile: { id: profileId },
        promotions: { id: promotionId }
      }
    });
    if (!center) {
      throw new NotFoundException()
    }
    return center;
  }

  async addProfileToCenter(centerId: string, profileId: string) {
    const profile = await this.profileRepository.findOne({ where: { id: profileId } });
    const center = await this.centerRepository.findOne({ where: { id: centerId } })
    if (!center) {
      throw new NotFoundException("Centre non existant");
    }
    profile.center = center;
    await this.profileRepository.save(profile);
    return profile;
  }

  async addPromotionsToCenter(promotionId: string, centerId: string) {
    const center = await this.centerRepository.findOne({ where: { id: centerId }, relations: ['promotions'] });
    const promotion = await this.promotionRepository.findOne({ where: { id: promotionId } });
    if (!promotion) {
      throw new HttpException('Promotion non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(center.promotions)) {
      center.promotions.push(promotion)
    } else {
      center.promotions = [promotion];
    }
    await this.centerRepository.save(promotion)
    return center;
  }

  create(createCenterDto: CreateCenterDto) {
    const center = this.centerRepository.create(createCenterDto);
    return this.centerRepository.save(center);
  }

  async update(id: string, updateCenterDto: UpdateCenterDto) {
    const center = await this.centerRepository.preload({
      id: id,
      ...updateCenterDto,
    })
    if (!center) {
      throw new NotFoundException()
    }
    return this.centerRepository.save(center);
  }
  async delete(id: string) {
    const center = await this.findById(id)
    return this.centerRepository.remove(center)
  }
}
