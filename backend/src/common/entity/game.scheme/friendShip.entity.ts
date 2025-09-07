import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { EntityPlayer } from "./player.entity";

@Entity({ schema: 'game', name: 'friendships' })
export class EntityFriendship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'player1_id' })
    player1Id: number;

    @Column({ name: 'player2_id' })
    player2Id: number;

    @ManyToOne(() => EntityPlayer, (player) => player.sentRequests)
    @JoinColumn({ name: 'player1_id' })
    player1: EntityPlayer;

    @ManyToOne(() => EntityPlayer, (player) => player.receivedRequests)
    @JoinColumn({ name: 'player2_id' })
    player2: EntityPlayer;
    
    @CreateDateColumn({ name: 'created_at' , type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}