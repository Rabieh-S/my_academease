import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionService } from './promotion.service';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) { }

  @Get()
  findAll() {
    return this.promotionService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('profileId') profileId: string,
    @Param('absenceId') absenceId: string,
    @Param('lessonId') lessonId: string) {
    return this.promotionService.findOne(profileId, absenceId, lessonId);
  }

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Post(':id/profile')
  addProfileToPromotion(
    @Param('id') promotionId: string,
    @Body() body: { profileId: string }
  ) {
    return this.promotionService.addProfileToPromotion(promotionId, body.profileId);
  }

  @Post(':id/lesson')
  addLessonsToPromotion(
    @Param('id') promotionId: string,
    @Body() body: { lessonId: string }
  ) {
    return this.promotionService.addLessonsToPromotion(promotionId, body.lessonId);
  }

  @Post(':id/center')
  addCentersToPromotion(
    @Param('id') promotionId: string,
    @Body() body: { centerId: string }
  ) {
    return this.promotionService.addCentersToPromotion(promotionId, body.centerId);
  }

  @Post(':id/document')
  addDocumentsToPromotion(
    @Param('id') promotionId: string,
    @Body() body: { documentId: string }
  ) {
    return this.promotionService.addDocumentsToPromotion(promotionId, body.documentId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    return this.promotionService.update(id, updatePromotionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionService.delete(id);
  }
}
