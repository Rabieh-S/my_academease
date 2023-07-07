import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quizz } from './entities/quizz.entity';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { UpdateQuizzDto } from './dto/update-quizz.dto';
import { Profile } from '../profile/entities/profile.entity';
import { Lesson } from '../lesson/entities/lesson.entity';

@Injectable()
export class QuizzService {
  constructor(
    @InjectRepository(Quizz)
    private readonly quizzRepository: Repository<Quizz>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) { }

  findAll() {
    return this.quizzRepository.find({
      relations: ['profiles']
    });
  }

  async findById(id: string) {
    const quizz = await this.quizzRepository.findOneBy({ id: id });
    if (!quizz) {
      throw new NotFoundException();
    }
    return quizz;
  }

  async findOne(questionId: string, resultId: string, lessonId: string, profileId: string) {
    const quizz = await this.quizzRepository.findOne({
      relations: ['question', 'result', 'lessons', 'profiles'],
      where: {
        question: { id: questionId },
        result: { id: resultId },
        lessons: { id: lessonId },
        profiles: { id: profileId },
      }
    });
    if (!quizz) {
      throw new NotFoundException()
    }
    return quizz;
  }

  create(createQuizzDto: CreateQuizzDto) {
    const quizz = this.quizzRepository.create(createQuizzDto);
    return this.quizzRepository.save(quizz);
  }

  async addProfilesToQuizz(quizzId: string, profileId: string) {
    const quizz = await this.quizzRepository.findOne({ where: { id: quizzId }, relations: ['profiles'] });
    const profile = await this.profileRepository.findOne({ where: { id: profileId } });
    if (!quizz) {
      throw new NotFoundException('Quizz non existant');
    }
    if (Array.isArray(quizz.profiles)) {
      quizz.profiles.push(profile);

    } else {
      quizz.profiles = [profile];
    }
    await this.quizzRepository.save(quizz);
    return quizz;
  }

  async addLessonsToQuizz(quizzId: string, lessonId: string) {
    const quizz = await this.quizzRepository.findOne({ where: { id: quizzId }, relations: ['lessons'] });
    const lesson = await this.lessonRepository.findOne({ where: { id: lessonId } });
    if (!quizz) {
      throw new NotFoundException('Quizz non existant');
    }

    if (Array.isArray(quizz.lessons)) {
      quizz.lessons.push(lesson);

    } else {
      quizz.lessons = [lesson];
    }
    await this.quizzRepository.save(quizz);
    return quizz;
  }

  async update(id: string, updateQuizzDto: UpdateQuizzDto) {
    const quizz = await this.quizzRepository.preload({
      id: id,
      ...updateQuizzDto,
    })
    if (!quizz) {
      throw new NotFoundException()
    }
    return this.quizzRepository.save(quizz);
  }
  async delete(id: string) {
    const quizz = await this.findById(id)
    return this.quizzRepository.remove(quizz)
  }
}
