import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EntityRolesUsers } from '../links.scheme/roles_users.entity';

@Entity({ schema: 'reference', name: 'roles' })
export class EntityRole {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@Column({ type: 'varchar', length: 20, unique: true })
	name: string;

	@OneToMany(() => EntityRolesUsers, (roles_user) => roles_user.role)
	users: EntityRolesUsers[];
}
