import { Absence } from "src/modules/absence/entities/absence.entity";
import { Center } from "src/modules/center/entities/center.entity";
import { Document } from "src/modules/document/entities/document.entity";
import { Lesson } from "src/modules/lesson/entities/lesson.entity";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Promotion {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  expiration: Date;

  @OneToMany(() => Absence, (absence) => absence.promotion)
  absence: Absence[];

  @OneToMany(() => Profile, (profile) => profile.promotion)
  profile: Profile[];

  @ManyToMany(() => Lesson, (lesson) => lesson.promotions)
  @JoinTable({
    name: 'promotion_has_lesson',
    joinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'lesson_id', referencedColumnName: 'id' },
  })
  lessons: Lesson[];

  @ManyToMany(() => Document, (document) => document.promotions)
  @JoinTable({
    name: 'promotion_has_document',
    joinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'document_id', referencedColumnName: 'id' },
  })
  documents: Document[];

  @ManyToMany(() => Center, (center) => center.promotions)
  centers: Center[];
}