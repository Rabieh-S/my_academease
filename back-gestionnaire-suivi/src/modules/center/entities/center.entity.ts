import { Profile } from "src/modules/profile/entities/profile.entity";
import { Promotion } from "src/modules/promotion/entities/promotion.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Center {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  is_remote: boolean;

  @Column()
  region: string;

  @OneToMany(() => Profile, (profile) => profile.center)
  profile: Profile[];

  @ManyToMany(() => Promotion, (promotion) => promotion.centers)
  @JoinTable({
    name: 'center_has_promotion',
    joinColumn: { name: 'center_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'promotion_id', referencedColumnName: 'id' }
  })
  promotions: Promotion[];
}