import { Quizz } from "src/modules/quizz/entities/quizz.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column('json')
  response: string[];

  @ManyToOne(() => Quizz, (quizz) => quizz.question)
  @JoinColumn({ name: 'quizz_id' })
  quizz: Quizz;
}