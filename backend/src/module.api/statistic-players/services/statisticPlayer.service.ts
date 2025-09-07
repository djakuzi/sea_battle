import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityStatisticPlayers } from "src/common/entity/game.scheme/statistic-players.entity";
import { EntityManager } from "typeorm";
import { StatisticPlayersRepository } from "../repositories/statistic-players.repository";

@Injectable()
export class StatisticPlayerService {
    constructor(
        private readonly repoStatistic: StatisticPlayersRepository,
    ){}

    async createStatistic(idPlayer: number, manager?: EntityManager): Promise<EntityStatisticPlayers> {
        const res = await this.repoStatistic.createStatistic(idPlayer, manager);

        if (!res) throw new InternalServerErrorException('Произошла ошибка при создании игрока');
        return res;
    }
}