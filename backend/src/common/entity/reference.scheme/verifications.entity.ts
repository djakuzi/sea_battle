import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityVerificationsUsers } from '../public.scheme/verifications_users.entity';

@Entity({ schema: 'reference', name: 'verifications' })
export class EntityVerifications {
	@PrimaryGeneratedColumn({ type: 'int4' })
	id: number;

	@Column({ type: 'varchar', length: 20, unique: true })
	name: string;

	@OneToMany(
		() => EntityVerificationsUsers,
		(verifications_users) => verifications_users.verification
	)
	users: EntityVerificationsUsers[];
}
