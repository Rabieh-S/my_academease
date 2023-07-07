import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonService } from './lesson.service';


@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }

  @Get()
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('absenceId') absenceId: string,
    @Param('promotionId') promotionId: string,
    @Param('quizzId') quizzId: string,
    @Param('profileId') profileId: string,
  ) {
    return this.lessonService.findOne(absenceId, promotionId, quizzId, profileId);
  }

  @Post(':id/quizz')
  addQuizzsToLesson(
    @Param('id') lessonId: string,
    @Body() body: { quizzId: string }
  ) {
    return this.lessonService.addQuizzsToLesson(lessonId, body.quizzId);
  }

  @Post(':id/profile')
  addProfilesToLesson(
    @Param('id') lessonId: string,
    @Body() body: { profileId: string }
  ) {
    return this.lessonService.addProfilesToLesson(lessonId, body.profileId);
  }

  @Post(':id/promotion')
  addPromotionsToLesson(
    @Param('id') lessonId: string,
    @Body() body: { promotionId: string }
  ) {
    return this.lessonService.addPromotionsToLesson(lessonId, body.promotionId);
  }

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.delete(id);
  }
}
