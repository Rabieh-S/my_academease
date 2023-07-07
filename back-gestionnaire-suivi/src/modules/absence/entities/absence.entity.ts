import { Lesson } from "src/modules/lesson/entities/lesson.entity";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { Promotion } from "src/modules/promotion/entities/promotion.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Absence {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  morning_date: Date;

  @Column('date')
  afternoon_date: Date;

  @ManyToMany(() => Profile, (profile) => profile.absences)
  profiles: Profile[];

  @ManyToOne(() => Promotion, (promotion) => promotion.absence)
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @ManyToOne(() => Lesson, (lesson) => lesson.absence)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

}