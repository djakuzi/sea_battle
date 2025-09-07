import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { EntityPlayer } from "./player.entity";

@Entity({ schema: 'game', name: 'statistic_players' })
export class EntityStatisticPlayers {
    @PrimaryGeneratedColumn()
    id: number;

    // Внешний ключ на таблицу игроков
    @PrimaryColumn()
    player_id: number;

    // Связь с сущностью игрока (One-to-One)
    @OneToOne(() => EntityPlayer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'player_id' })
    player: EntityPlayer;

    // Статистика игроков
    @Column({ type: 'integer', default: 0 })
    quantity_battles: number;

    @Column({ type: 'integer', default: 0 })
    quantity_wins: number;

    @Column({ type: 'integer', default: 0 })
    quantity_losses: number;

    @Column({ type: 'real', default: 0 })
    win_percentage: number;

    @Column({ type: 'integer', default: 0 })
    longest_win_streak: number;

    @Column({ type: 'integer', default: 0 })
    shots_taken: number;

    @Column({ type: 'integer', default: 0 })
    shots_hit: number;

    @Column({ type: 'real', default: 0 })
    hit_accuracy: number;

    @Column({ type: 'integer', default: 0 })
    total_achievements: number;

    @Column({ type: 'integer', default: 0 })
    classic_battles_wins: number;

    @Column({ type: 'integer', default: 0 })
    team_battles_wins: number;

    @Column({ type: 'integer', default: 0 })
    total_tournament_battles: number;

    @Column({ type: 'integer', default: 0 })
    tournament_battles_wins: number;

    @Column({ type: 'integer', default: 0 })
    total_respect_received: number;
}