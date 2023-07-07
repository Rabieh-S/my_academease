import { Profile } from "src/modules/profile/entities/profile.entity";
import { Promotion } from "src/modules/promotion/entities/promotion.entity";
import { PrimaryGeneratedColumn, Entity, Column, ManyToMany } from "typeorm";

@Entity()
export class Document {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToMany(() => Profile, (profile) => profile.documents)
  profiles: Profile[];

  @ManyToMany(() => Promotion, (promotion) => promotion.documents)
  promotions: Promotion[];

}