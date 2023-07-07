import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Absence } from './entities/absence.entity';
import { Repository } from 'typeorm';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { Lesson } from '../lesson/entities/lesson.entity';
import { Promotion } from '../promotion/entities/promotion.entity';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectRepository(Absence)
    private readonly absenceRepository: Repository<Absence>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>
  ) { }

  findAll() {
    return this.absenceRepository.find();
  }

  async findById(id: string) {
    const absence = await this.absenceRepository.findOne({ where: { id: id } });
    if (!absence) {
      throw new NotFoundException()
    }
    return absence;
  }

  async findOne(id: string) {
    const absence = await this.absenceRepository.findOne({ where: { id: id } });
    if (!absence) {
      throw new NotFoundException()
    }
    return absence;
  }

  create(createAbsenceDto: CreateAbsenceDto) {
    const absence = this.absenceRepository.create(createAbsenceDto);
    return this.absenceRepository.save(absence);
  }

  async addAbsenceToPromotion(absenceId: string, promotionId: string) {
    const promotion = await this.promotionRepository.findOne({ where: { id: promotionId }, relations: ['absence'] });
    const absence = await this.absenceRepository.findOne({ where: { id: absenceId } });
    if (!promotion) {
      throw new HttpException('Promotion non existante', HttpStatus.BAD_REQUEST)
    }
    absence.promotion = promotion
    await this.absenceRepository.save(absence);
    return promotion;
  }

  async addAbsenceToLesson(lessonId: string, absenceId: string) {
    const lesson = await this.lessonRepository.findOne({ where: { id: lessonId }, relations: ['absence'] });
    const absence = await this.absenceRepository.findOne({ where: { id: absenceId } });
    if (!lesson) {
      throw new HttpException('Module non existant', HttpStatus.BAD_REQUEST)
    }
    absence.lesson = lesson;
    await this.absenceRepository.save(absence)
    return lesson;
  }

  async addProfilesToAbsence(absenceId: string, profileId: string,) {
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

  async update(id: string, updateAbsenceDto: UpdateAbsenceDto) {
    const absence = await this.absenceRepository.preload({
      id: id,
      ...updateAbsenceDto,
    })
    if (!absence) {
      throw new NotFoundException()
    }
    return this.absenceRepository.save(absence);
  }
  async delete(id: string) {
    const absence = await this.findById(id)
    return this.absenceRepository.remove(absence)
  }
}
