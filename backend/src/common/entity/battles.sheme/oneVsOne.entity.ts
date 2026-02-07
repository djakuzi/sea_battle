import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { EntityPlayer } from "../game.scheme/player.entity";

@Entity('one_vs_one', { schema: 'battles' })
export class EntityOneVsOne {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text' })
	id_player1: string;

	@Column({ type: 'text' })
	id_player2: string;

	@Column({ type: 'text' })
	id_winner: string;

	@Column('int')
	duration_game: number;

	@Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@ManyToOne(() => EntityPlayer, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_player1' })
	player1: EntityPlayer;

	@ManyToOne(() => EntityPlayer, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_player2' })
	player2: EntityPlayer;

	@ManyToOne(() => EntityPlayer, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_winner' })
	winner: EntityPlayer;
}