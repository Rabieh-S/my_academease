import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultService {
  constructor(@InjectRepository(Result)
  private readonly resultRepository: Repository<Result>) { }

  findAll() {
    return this.resultRepository.find();
  }

  async findById(id: string) {
    const result = await this.resultRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException()
    }
    return result;
  }

  async findOne(id: string) {
    const result = await this.resultRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException()
    }
    return result;
  }

  create(createResultDto: CreateResultDto) {
    const result = this.resultRepository.create(createResultDto);
    return this.resultRepository.save(result);
  }

  async update(id: string, updateResultDto: UpdateResultDto) {
    const result = await this.resultRepository.preload({
      id: id,
      ...updateResultDto,
    })
    if (!result) {
      throw new NotFoundException()
    }
    return this.resultRepository.save(result);
  }
  async delete(id: string) {
    const result = await this.findOne(id)
    return this.resultRepository.remove(result)
  }
}
