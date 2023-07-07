import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Profile } from '../profile/entities/profile.entity';
import { Lesson } from '../lesson/entities/lesson.entity';
import { Quizz } from '../quizz/entities/quizz.entity';
import { Center } from '../center/entities/center.entity';
import { Document } from '../document/entities/document.entity';


@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Center)
    private centerRepository: Repository<Center>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) { }

  findAll() {
    return this.promotionRepository.find({
      relations: ['profile', 'lessons', 'absence']
    });
  }

  async findById(id: string) {
    const promotion = await this.promotionRepository.findOne({ where: { id: id } });
    if (!promotion) {
      throw new NotFoundException()
    }
    return promotion;
  }

  async findOne(profileId: string, absenceId: string, lessonId: string) {
    const promotion = await this.promotionRepository.findOne({
      relations: ['profile', 'absence', 'lessons'],
      where: {
        profile: { id: profileId },
        absence: { id: absenceId },
        lessons: { id: lessonId },
      }
    });
    if (!promotion) {
      throw new NotFoundException()
    }
    return promotion;
  }

  create(createPromotionDto: CreatePromotionDto) {
    const promotion = this.promotionRepository.create(createPromotionDto);
    return this.promotionRepository.save(promotion);
  }

  async addCentersToPromotion(promotionId: string, centerId: string) {
    const promotion = await this.promotionRepository.findOne({ where: { id: promotionId }, relations: ['centers'] });
    const center = await this.centerRepository.findOneBy({ id: centerId });
    if (!promotion) {
      throw new HttpException('Promotion non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(promotion.centers)) {
      promotion.centers.push(center)
    } else {
      promotion.centers = [center];
    }
    await this.promotionRepository.save(promotion)
    return promotion;
  }

  async addDocumentsToPromotion(promotionId: string, documentId: string) {
    const promotion = await this.promotionRepository.findOne({ where: { id: promotionId }, relations: ['documents'] });
    const document = await this.documentRepository.findOneBy({ id: documentId });
    if (!promotion) {
      throw new HttpException('Promotion non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(promotion.documents)) {
      promotion.documents.push(document)
    } else {
      promotion.documents = [document];
    }
    await this.promotionRepository.save(promotion)
    return promotion;
  }

  async addLessonsToPromotion(promotionId: string, lessonId: string) {
    const promotion = await this.promotionRepository.findOne({ where: { id: promotionId }, relations: ['lessons'] });
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
    if (!promotion) {
      throw new HttpException('Promotion non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(promotion.lessons)) {
      promotion.lessons.push(lesson)
    } else {
      promotion.lessons = [lesson];
    }
    await this.promotionRepository.save(promotion)
    return promotion;
  }


  async addProfileToPromotion(promotionId: string, profileId: string) {
    const promotion = await this.promotionRepository.findOne({ where: { id: promotionId }, relations: ['profile'] });
    const profile = await this.profileRepository.findOne({ where: { id: profileId } })
    if (!promotion) {
      throw new HttpException('Promotion non existante', HttpStatus.BAD_REQUEST)
    }
    promotion.profile.push(profile)
    await this.promotionRepository.save(promotion);
    return profile;
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionRepository.preload({
      id: id,
      ...updatePromotionDto,
    })
    if (!promotion) {
      throw new NotFoundException()
    }
    return this.promotionRepository.save(promotion);
  }
  async delete(id: string) {
    const promotion = await this.findById(id)
    return this.promotionRepository.remove(promotion)
  }
}
