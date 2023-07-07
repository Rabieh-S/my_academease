import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';

@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) { }

  @Get()
  findAll() {
    return this.absenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.absenceService.findOne(id);
  }

  @Post()
  create(@Body() createAbsenceDto: CreateAbsenceDto) {
    return this.absenceService.create(createAbsenceDto);
  }

  @Post(':id/promotion')
  addAbsenceToPromotion(
    @Param('id') absenceId: string,
    @Body() body: { promotionId: string }
  ) {
    return this.absenceService.addAbsenceToPromotion(absenceId, body.promotionId)
  }

  @Post(':id/lesson')
  addAbsenceToLesson(
    @Param('id') absenceId: string,
    @Body() body: { lessonId: string }
  ) {
    return this.absenceService.addAbsenceToLesson(absenceId, body.lessonId);
  }

  @Post(':id/profile')
  addProfilesToAbsence(
    @Param('id') absenceId: string,
    @Body() body: { profileId: string }
  ) {
    return this.absenceService.addProfilesToAbsence(absenceId, body.profileId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbsenceDto: UpdateAbsenceDto) {
    return this.absenceService.update(id, updateAbsenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.absenceService.delete(id);
  }
}
