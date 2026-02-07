import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { EntityUser } from '../public.scheme/user.entity';
import { EntityFriendRequest } from './friendRequest.entity';
import { EntityFriendship } from './friendShip.entity';
import { EntityOneVsOne } from '../battles.sheme/oneVsOne.entity';

@Entity({ schema: 'game', name: 'players' })
export class EntityPlayer {
	@PrimaryGeneratedColumn()
	id: number;

	@PrimaryColumn()
	user_id: number;

	@Column({ type: 'integer', default: 0 })
	experience: number;

	@Column({ type: 'text', nullable: true })
	avatar: string;

	@Column({ type: 'varchar', length: 20 })
	nickname: string;

	@Column({ type: 'boolean' })
	is_online: boolean;

	@Column({ type: 'timestamptz', nullable: false })
	last_online: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: false })
	updated_at: Date;

	@OneToOne(() => EntityUser, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: EntityUser;

	@OneToMany(() => EntityFriendRequest, (friendRequest) => friendRequest.sender)
	sentRequests: EntityFriendRequest[];

	@OneToMany(() => EntityFriendRequest, (friendRequest) => friendRequest.receiver)
	receivedRequests: EntityFriendRequest[];

	@OneToMany(() => EntityFriendship, (friendship) => friendship.player1)
	friendshipsAsPlayer1: EntityFriendship[];

	@OneToMany(() => EntityFriendship, (friendship) => friendship.player2)
	friendshipsAsPlayer2: EntityFriendship[];

	@OneToMany(() => EntityOneVsOne, (oneVsOne) => oneVsOne.player1)
	battlesAsPlayer1: EntityOneVsOne[];

	@OneToMany(() => EntityOneVsOne, (oneVsOne) => oneVsOne.player2)
	battlesAsPlayer2: EntityOneVsOne[];

	@OneToMany(() => EntityOneVsOne, (oneVsOne) => oneVsOne.winner)
	battlesAsWinner: EntityOneVsOne[];
}
