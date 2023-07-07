import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Quizz } from '../quizz/entities/quizz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Quizz)
    private readonly quizzRepository: Repository<Quizz>
  ) { }

  findAll() {
    return this.questionRepository.find();
  }

  async findOne(id: string) {
    const question = await this.questionRepository.findOne({ where: { id: id } });
    if (!question) {
      throw new NotFoundException()
    }
    return question;
  }

  async findById(id: string) {
    const question = await this.questionRepository.findOne({ where: { id: id } });
    if (!question) {
      throw new NotFoundException()
    }
    return question;
  }

  create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  async addQuestionToQuizz(questionId: string, quizzId: string) {
    const question = await this.questionRepository.findOne({ where: { id: questionId } })
    const quizz = await this.quizzRepository.findOne({ where: { id: quizzId } })
    if (!quizz) {
      throw new HttpException('Quizz non existant', HttpStatus.BAD_REQUEST)
    }

  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.preload({
      id: id,
      ...updateQuestionDto,
    })
    if (!question) {
      throw new NotFoundException()
    }
    return this.questionRepository.save(question);
  }
  async delete(id: string) {
    const question = await this.findById(id)
    return this.questionRepository.remove(question)
  }
}
