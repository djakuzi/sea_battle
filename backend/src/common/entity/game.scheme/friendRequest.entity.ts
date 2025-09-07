import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { EntityPlayer } from "./player.entity";

@Entity({ schema: 'game', name: 'friend_requests' })
@Unique(['senderId', 'receiverId'])
export class EntityFriendRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'sender_id' })
    senderId: number;

    @Column({ name: 'receiver_id' })
    receiverId: number;

    @ManyToOne(() => EntityPlayer, (player) => player.sentRequests)
    @JoinColumn({ name: 'sender_id' })
    sender: EntityPlayer;

    @ManyToOne(() => EntityPlayer, (player) => player.receivedRequests)
    @JoinColumn({ name: 'receiver_id' })
    receiver: EntityPlayer;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}