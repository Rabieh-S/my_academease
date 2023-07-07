import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { UpdateQuizzDto } from './dto/update-quizz.dto';
import { Roles } from '../auth/common/decorators/roles.decorator';
import { Role } from '../user/entities/role.enum';

@Controller('quizz')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) { }

  @Roles(Role.USER)
  @Get()
  findAll() {
    return this.quizzService.findAll();
  }

  @Roles(Role.USER)
  @Get(':id')
  findOne(
    @Param('questionId') questionId: string,
    @Param('resultId') resultId: string,
    @Param('lessonId') lessonId: string,
    @Param('profileId') profileId: string
  ) {
    return this.quizzService.findOne(questionId, resultId, lessonId, profileId);
  }

  @Roles(Role.USER)
  @Post()
  create(@Body() createQuizzDto: CreateQuizzDto) {
    return this.quizzService.create(createQuizzDto);
  }

  @Post(':id/profile')
  addProfilesToQuizz(
    @Param('id') quizzId: string,
    @Body() body: { profileId: string }
  ) {
    return this.quizzService.addProfilesToQuizz(quizzId, body.profileId);
  }

  @Post(':id/lesson')
  addLessonsToQuizz(
    @Param('id') quizzId: string,
    @Body() body: { lessonId: string }
  ) {
    return this.quizzService.addLessonsToQuizz(quizzId, body.lessonId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizzDto: UpdateQuizzDto) {
    return this.quizzService.update(id, updateQuizzDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzService.delete(id);
  }
}
