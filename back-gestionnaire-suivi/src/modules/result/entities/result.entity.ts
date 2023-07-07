import { Profile } from "src/modules/profile/entities/profile.entity";
import { Quizz } from "src/modules/quizz/entities/quizz.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Result {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Profile, (profile) => profile.result)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ManyToOne(() => Quizz, (quizz) => quizz.result)
  @JoinColumn({ name: 'quizz_id' })
  quizz: Quizz;
}