import { Entity, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { EntityUser } from '../public.scheme/user.entity';
import { EntityRole } from '../reference.scheme/role.entity';

@Entity({ schema: 'links', name: 'roles_users' })
export class EntityRolesUsers {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  role_id: number;

  @ManyToOne(() => EntityUser, (user) => user.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: EntityUser;

  @ManyToOne(() => EntityRole, (role) => role.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: EntityRole;
}
