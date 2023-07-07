import { Absence } from 'src/modules/absence/entities/absence.entity';
import { Center } from 'src/modules/center/entities/center.entity';
import { Document } from 'src/modules/document/entities/document.entity';
import { Lesson } from 'src/modules/lesson/entities/lesson.entity';
import { Promotion } from 'src/modules/promotion/entities/promotion.entity';
import { Quizz } from 'src/modules/quizz/entities/quizz.entity';
import { Result } from 'src/modules/result/entities/result.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Status } from './status.enum';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: "enum", enum: Status, default: Status.PENDING })
  status: Status;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  postal_code: string;

  @Column()
  city: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  rgpd: Date;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToMany(() => Result, (result) => result.profile)
  result: Result[];

  @ManyToOne(() => Center, (center) => center.profile)
  @JoinColumn({ name: 'center_id' })
  center: Center;

  @ManyToOne(() => Promotion, (promotion) => promotion.profile)
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @ManyToMany(() => Absence, (absence) => absence.profiles)
  @JoinTable({
    name: 'profile_has_absence',
    joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'absence_id', referencedColumnName: 'id' }
  })
  absences: Absence[];

  @ManyToMany(() => Quizz, (quizz) => quizz.profiles)
  @JoinTable({
    name: 'profile_has_quizz',
    joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'quizz_id', referencedColumnName: 'id' }
  })
  quizzs: Quizz[];

  @ManyToMany(() => Lesson, (lesson) => lesson.profiles)
  @JoinTable({
    name: 'profile_has_lesson',
    joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'lesson_id', referencedColumnName: 'id' },
  })
  lessons: Lesson[];

  @ManyToMany(() => Document, (document) => document.profiles)
  @JoinTable({
    name: 'profile_has_document',
    joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'document_id', referencedColumnName: 'id' },
  })
  documents: Document[];
}
