import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PromotionController } from './modules/promotion/promotion.controller';
import { PromotionModule } from './modules/promotion/promotion.module';
import { ProfileModule } from './modules/profile/profile.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { AbsenceModule } from './modules/absence/absence.module';
import { QuizzModule } from './modules/quizz/quizz.module';
import { ResultModule } from './modules/result/result.module';
import { CenterModule } from './modules/center/center.module';
import { DocumentModule } from './modules/document/document.module';
import { QuestionModule } from './modules/question/question.module';
import { AuthModule } from './modules/auth/auth.module';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    PromotionModule,
    ProfileModule,
    LessonModule,
    AbsenceModule,
    QuizzModule,
    ResultModule,
    CenterModule,
    DocumentModule,
    QuestionModule,
    AuthModule,
  ],
  controllers: [AppController, PromotionController],
  providers: [AppService],
})
export class AppModule { }
