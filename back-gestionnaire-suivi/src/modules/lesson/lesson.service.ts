import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Quizz } from '../quizz/entities/quizz.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Promotion } from '../promotion/entities/promotion.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(Quizz)
    private readonly quizzRepository: Repository<Quizz>
  ) { }

  findAll() {
    return this.lessonRepository.find();
  }

  async findById(id: string) {
    const lesson = await this.lessonRepository.findOne({ where: { id: id } });
    if (!lesson) {
      throw new NotFoundException()
    }
    return lesson;
  }

  async findOne(absenceId: string, promotionId: string, quizzId: string, profileId: string) {
    const lesson = await this.lessonRepository.findOne({
      relations: ['absence', 'promotions', 'quizzs', 'profiles'],
      where: {
        absence: { id: absenceId },
        promotions: { id: promotionId },
        quizzs: { id: quizzId },
        profiles: { id: profileId }
      }
    });
    if (!lesson) {
      throw new NotFoundException()
    }
    return lesson;
  }

  create(createLessonDto: CreateLessonDto) {
    const lesson = this.lessonRepository.create(createLessonDto);
    return this.lessonRepository.save(lesson);
  }

  async addQuizzsToLesson(lessonId: string, quizzId: string) {
    const lesson = await this.lessonRepository.findOne({ where: { id: lessonId }, relations: ['quizzs'] });
    const quizz = await this.quizzRepository.findOneBy({ id: quizzId });
    if (!quizz) {
      throw new HttpException('Quizz non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(lesson.quizzs)) {
      lesson.quizzs.push(quizz)
    } else {
      lesson.quizzs = [quizz];
    }
    await this.lessonRepository.save(lesson)
    return lesson;
  }

  async addProfilesToLesson(lessonId: string, profileId: string) {
    const lesson = await this.lessonRepository.findOne({ where: { id: lessonId }, relations: ['profiles'] });
    const profile = await this.profileRepository.findOneBy({ id: profileId });
    if (!profile) {
      throw new HttpException('profile non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(lesson.profiles)) {
      lesson.profiles.push(profile)
    } else {
      lesson.profiles = [profile];
    }
    await this.lessonRepository.save(lesson)
    return lesson;
  }

  async addPromotionsToLesson(lessonId: string, promotionId: string) {
    const lesson = await this.lessonRepository.findOne({ where: { id: lessonId }, relations: ['promotions'] });
    const promotion = await this.promotionRepository.findOneBy({ id: promotionId });
    if (!promotion) {
      throw new HttpException('promotion non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(lesson.promotions)) {
      lesson.promotions.push(promotion)
    } else {
      lesson.promotions = [promotion];
    }
    await this.lessonRepository.save(lesson)
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonRepository.preload({
      id: id,
      ...updateLessonDto,
    })
    if (!lesson) {
      throw new NotFoundException()
    }
    return this.lessonRepository.save(lesson);
  }
  async delete(id: string) {
    const lesson = await this.findById(id)
    return this.lessonRepository.remove(lesson)
  }
}
