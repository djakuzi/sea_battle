import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EntityRolesUsers } from "../links.scheme/roles_users.entity";
import { EntityVerificationsUsers } from "./verifications_users.entity";
import { EntityPlayer } from "../game.scheme/player.entity";

@Entity({ schema: 'public', name: 'users' })
export class EntityUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  login: string;

  @Column({ type: 'uuid', default: () => 'gen_random_uuid()', nullable: false })
  uuid: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => EntityRolesUsers, (roles_users) => roles_users.user)
  roles?: EntityRolesUsers[];

  @OneToMany(() => EntityVerificationsUsers, (verifications_users) => verifications_users.user)
  verifications?: EntityVerificationsUsers[];

  @OneToOne(() => EntityPlayer, (player) => player.user)
  player: EntityPlayer;
}