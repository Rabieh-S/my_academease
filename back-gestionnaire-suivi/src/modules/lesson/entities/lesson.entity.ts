import { Absence } from "src/modules/absence/entities/absence.entity";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { Promotion } from "src/modules/promotion/entities/promotion.entity";
import { Quizz } from "src/modules/quizz/entities/quizz.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lesson {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  duration: Date;

  @OneToMany(() => Absence, (absence) => absence.lesson)
  absence: Absence[];

  @ManyToMany(() => Promotion, (promotion) => promotion.lessons)
  promotions: Promotion[];

  @ManyToMany(() => Quizz, (quizz) => quizz.lessons)
  quizzs: Quizz[];

  @ManyToMany(() => Profile, (profile) => profile.lessons)
  profiles: Profile[];
}