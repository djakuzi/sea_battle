import { Injectable } from "@nestjs/common";
import { EntityStatisticPlayers } from "src/common/entity/game.scheme/statistic-players.entity";
import { buildConditionsFindWhere } from "src/common/util/repository/conditions";
import { EntityManager } from "typeorm";
import { StatisticPlayersRepository } from "../repositories/statistic-players.repository";

@Injectable()
export class FindStatisticPlayerService {
    constructor(
        private readonly repoStatisticPlayers: StatisticPlayersRepository,
    ) {}

    async findOneStatistic(filter: Partial<EntityStatisticPlayers>, manager?: EntityManager): Promise<EntityStatisticPlayers | null> {
        const conditions = buildConditionsFindWhere<EntityStatisticPlayers, Partial<EntityStatisticPlayers>>(filter, 'OR');
        if (!conditions) return null;

        const statistic = await this.repoStatisticPlayers.findOne(conditions, manager);
        return statistic 
    }
}