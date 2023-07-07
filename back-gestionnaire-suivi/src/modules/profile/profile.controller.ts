import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('userId') userId: string,
    @Param('promotionId') promotionId: string,
    @Param('centerId') centerId: string,
    @Param('quizzId') quizzId: string,
    @Param('absenceId') absenceId: string
  ) {
    return this.profileService.findOne(userId, promotionId, centerId, quizzId, absenceId);
  }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Post(':id/center')
  addCenterToProfile(
    @Param('id') profileId: string,
    @Body() body: { centerId: string }
  ) {
    return this.profileService.addCenterToProfile(profileId, body.centerId);
  }

  @Post(':id/promotion')
  addPromotionToProfile(
    @Param('id') profileId: string,
    @Body() body: { promotionId: string }
  ) {
    return this.profileService.addPromotionToProfile(profileId, body.promotionId);
  }

  @Post(':id/absence')
  addAbsencesToProfile(
    @Param('id') profileId: string,
    @Body() body: { absenceId: string }
  ) {
    return this.profileService.addAbsencesToProfile(profileId, body.absenceId);
  }

  @Post(':id/quizz')
  addQuizzsToProfile(
    @Param('id') profileId: string,
    @Body() body: { quizzId: string }
  ) {
    return this.profileService.addQuizzsToProfile(profileId, body.quizzId);
  }

  @Post(':id/lesson')
  addLessonsToProfile(
    @Param('id') profileId: string,
    @Body() body: { lessonId: string }
  ) {
    return this.profileService.addLessonsToProfile(profileId, body.lessonId);
  }

  @Post(':id/document')
  addDocumentsToProfile(
    @Param('id') profileId: string,
    @Body() body: { documentId: string }
  ) {
    return this.profileService.addDocumentsToProfile(profileId, body.documentId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateprofileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateprofileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.delete(id);
  }
}
