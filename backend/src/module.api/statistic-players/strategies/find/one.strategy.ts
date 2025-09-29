import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { IntrStandartSchemaStrategy, IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";
import { buildConditionsFindWhere } from "src/common/util/repository/conditions";
import { EnumNameStrategyFindStatisticPlayer } from "../../services/findStatisticPlayer.service";
import { StatisticPlayersRepository } from "../../repositories/statistic-players.repository";
import { EntityStatisticPlayers } from "src/common/entity/game.scheme/statistic-players.entity";

export interface IntrArgsStrategyOne {
    filter: Partial<EntityStatisticPlayers>, 
    manager?: EntityManager
}

export type TypeReturnStrategyOne = EntityStatisticPlayers | null;

export interface IntrSchemaStrategyOne extends IntrStandartSchemaStrategy<IntrArgsStrategyOne, TypeReturnStrategyOne> {
    args: IntrArgsStrategyOne,
    return: TypeReturnStrategyOne
}

@Injectable()
export class StrategyOne implements IntrStandartStrategy<EnumNameStrategyFindStatisticPlayer> {
    readonly name = EnumNameStrategyFindStatisticPlayer.ONE;

    constructor(
        private readonly repoStatisticPlayers: StatisticPlayersRepository,
    ) { }

    async execute(args: IntrSchemaStrategyOne['args']): Promise<IntrSchemaStrategyOne['return']> {
        const conditions = buildConditionsFindWhere<EntityStatisticPlayers, Partial<EntityStatisticPlayers>>(args.filter, 'OR');
        if (!conditions) return null;

        const statistic = await this.repoStatisticPlayers.findOne(conditions, args.manager);

        return statistic 
    }
}