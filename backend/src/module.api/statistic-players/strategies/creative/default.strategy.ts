import { EntityManager } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { IntrStandartSchemaStrategy, IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";
import { StatisticPlayersRepository } from "../../repositories/statistic-players.repository";
import { EntityStatisticPlayers } from "src/common/entity/game.scheme/statistic-players.entity";
import { EnumNameStrategyCreativeStatisticPlayer } from "../../services/createStatisticPlayer.service";

export interface IntrArgsStrategyDefault {
    idPlayer: number, 
    manager?: EntityManager
}

export type TypeReturnStrategyDefault = EntityStatisticPlayers;

export interface IntrSchemaStrategyDefault extends IntrStandartSchemaStrategy<IntrArgsStrategyDefault, TypeReturnStrategyDefault> {
    args: IntrArgsStrategyDefault,
    return: TypeReturnStrategyDefault
}

@Injectable()
export class StrategyDefault implements IntrStandartStrategy<EnumNameStrategyCreativeStatisticPlayer> {
    readonly name = EnumNameStrategyCreativeStatisticPlayer.DEFAULT;

    constructor(
        private readonly repoStatistic: StatisticPlayersRepository,
    ) { }

    async execute(args: IntrSchemaStrategyDefault['args']): Promise<IntrSchemaStrategyDefault['return']> {
        const res = await this.repoStatistic.createStatistic(args.idPlayer, args.manager);

        if (!res) throw new InternalServerErrorException('Произошла ошибка при создании создании зависимостей игрока');
        return res;
    }
}