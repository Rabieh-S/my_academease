import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Profile } from '../profile/entities/profile.entity';
import { Promotion } from '../promotion/entities/promotion.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) { }

  findAll() {
    return this.documentRepository.find();
  }

  async findById(id: string) {
    const document = await this.documentRepository.findOne({ where: { id: id } });
    if (!document) {
      throw new NotFoundException()
    }
    return document;
  }

  async findOne(id: string) {
    const document = await this.documentRepository.findOne({ where: { id: id } });
    if (!document) {
      throw new NotFoundException()
    }
    return document;
  }

  create(createDocumentDto: CreateDocumentDto) {
    const document = this.documentRepository.create(createDocumentDto);
    return this.documentRepository.save(document);
  }

  async addProfilesToDocument(profileId: string, documentId: string) {
    const document = await this.documentRepository.findOne({ where: { id: documentId }, relations: ['profiles'] });
    const profile = await this.profileRepository.findOne({ where: { id: profileId } });
    if (!profile) {
      throw new HttpException('Profile non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(document.profiles)) {
      document.profiles.push(profile)
    } else {
      document.profiles = [profile];
    }
    await this.documentRepository.save(document)
    return document;
  }

  async addPromotionsToDocument(documentId: string, promotionId: string) {
    const document = await this.documentRepository.findOne({ where: { id: documentId }, relations: ['promotions'] });
    const promotion = await this.promotionRepository.findOne({ where: { id: promotionId } });
    if (!promotion) {
      throw new HttpException('promotion non existante', HttpStatus.BAD_REQUEST)
    }
    if (Array.isArray(document.promotions)) {
      document.promotions.push(promotion)
    } else {
      document.promotions = [promotion];
    }
    await this.documentRepository.save(document)
    return document;
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.documentRepository.preload({
      id: id,
      ...updateDocumentDto,
    })
    if (!Document) {
      throw new NotFoundException()
    }
    return this.documentRepository.save(document);
  }
  async delete(id: string) {
    const document = await this.findById(id)
    return this.documentRepository.remove(document)
  }
}
