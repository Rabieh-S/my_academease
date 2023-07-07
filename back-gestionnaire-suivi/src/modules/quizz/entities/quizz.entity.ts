import { Lesson } from "src/modules/lesson/entities/lesson.entity";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { Question } from "src/modules/question/entities/question.entity";
import { Result } from "src/modules/result/entities/result.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quizz {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('boolean', { default: false })
  is_completed: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Question, (question) => question.quizz)
  question: Question[];

  @OneToMany(() => Result, (result) => result.quizz)
  result: Result[];

  @ManyToMany(() => Profile, (profile) => profile.quizzs)
  profiles: Profile[];

  @ManyToMany(() => Lesson, (lesson) => lesson.quizzs)
  @JoinTable({
    name: 'quizz_has_lesson',
    joinColumn: { name: 'quizz_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'lesson_id', referencedColumnName: 'id' },
  })
  lessons: Lesson[];

}