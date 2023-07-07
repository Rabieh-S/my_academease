import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Promotion } from '../promotion/entities/promotion.entity';
import { Absence } from '../absence/entities/absence.entity';
import { Document } from '../document/entities/document.entity';
import { Lesson } from '../lesson/entities/lesson.entity';
import { Quizz } from '../quizz/entities/quizz.entity';
import { Center } from '../center/entities/center.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Absence)
    private absenceRepository: Repository<Absence>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Quizz)
    private quizzRepository: Repository<Quizz>,
    @InjectRepository(Center)
    private centerRepository: Repository<Center>,
    @InjectRepository(Profile)
    private promotionRepository: Repository<Promotion>
  ) { }

  findAll() {
    return this.profileRepository.find({
      relations: ['user', 'promotion', 'center', 'quizzs'],
    });
  }

  async findById(id: string) {
    const profile = await this.profileRepository.findOne({ where: { id: id } });
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }

  async findOne(userId: string, promotionId: string, centerId: string, quizzId: string, absenceId: string) {
    const profile = await this.profileRepository.findOne({
      relations: ['user', 'promotion', 'center', 'role', 'quizzs', 'absences'],
      where: {
        user: { id: userId },
        promotion: { id: promotionId },
        center: { id: centerId },
        quizzs: { id: quizzId },
        absences: { id: absenceId }
      },
    });
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }

  async create(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create(createProfileDto)
    return this.profileRepository.save(profile);
  }

  async addQuizzsToProfile(profileId: string, quizzId: string) {
    const profile = await this.profileRepository.findOne({ where: { id: profileId }, relations: ['quizzs'] });
    const quizz = await this.quizzRepository.findOneBy({ id: quizzId });
    if (!quizz) {
      throw new HttpException('quizz non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(profile.quizzs)) {
      profile.quizzs.push(quizz)
    } else {
      profile.quizzs = [quizz];
    }
    await this.profileRepository.save(profile)
    return profile;
  }

  async addLessonsToProfile(profileId: string, lessonId: string) {
    const profile = await this.profileRepository.findOne({ where: { id: profileId }, relations: ['lessons'] });
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
    if (!lesson) {
      throw new HttpException('lesson non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(profile.lessons)) {
      profile.lessons.push(lesson)
    } else {
      profile.lessons = [lesson];
    }
    await this.profileRepository.save(profile)
    return profile;
  }

  async addDocumentsToProfile(profileId: string, documentId: string) {
    const profile = await this.profileRepository.findOne({ where: { id: profileId }, relations: ['documents'] });
    const document = await this.documentRepository.findOneBy({ id: documentId });
    if (!document) {
      throw new HttpException('document non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(profile.documents)) {
      profile.documents.push(document)
    } else {
      profile.documents = [document];
    }
    await this.profileRepository.save(profile)
    return profile;
  }

  async addAbsencesToProfile(profileId: string, absenceId: string) {
    const profile = await this.profileRepository.findOne({ where: { id: profileId }, relations: ['absences'] });
    const absence = await this.absenceRepository.findOneBy({ id: absenceId });
    if (!absence) {
      throw new HttpException('absence non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(profile.absences)) {
      profile.absences.push(absence)
    } else {
      profile.absences = [absence];
    }
    await this.profileRepository.save(profile)
    return profile;
  }

  async addPromotionToProfile(profileId: string, promotionId: string) {
    const profile = await this.profileRepository.findOne({ where: { id: profileId }, relations: ['promotion'] });
    const promotion = await this.promotionRepository.findOneBy({ id: promotionId });
    if (!promotion) {
      throw new HttpException('Promotion non existante', HttpStatus.BAD_REQUEST)
    }
    profile.promotion = promotion
    await this.profileRepository.save(profile)
    return profile;
  }

  async addCenterToProfile(profileId: string, centerId: string) {
    const profile = await this.profileRepository.findOne({ where: { id: profileId }, relations: ['center'] });
    const center = await this.centerRepository.findOneBy({ id: centerId });
    if (!center) {
      throw new HttpException('center non existante', HttpStatus.BAD_REQUEST)
    }
    profile.center = center
    await this.profileRepository.save(profile)
    return profile;
  }

  async update(id: string, updateprofileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.preload({
      id: id,
      ...updateprofileDto,
    });
    if (!profile) {
      throw new NotFoundException();
    }
    return this.profileRepository.save(profile);
  }
  async delete(id: string) {
    const profile = await this.findById(id);
    return this.profileRepository.remove(profile);
  }
}
