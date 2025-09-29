import { Injectable, NotImplementedException } from "@nestjs/common";
import { IntrSchemaStrategyOne, StrategyOne } from "../strategies/find/one.strategy";
import { IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";

export enum EnumNameStrategyFindStatisticPlayer {
    ONE = 'one',
}

export interface IntrMapStrategyFindStatisticPlayer {
    [EnumNameStrategyFindStatisticPlayer.ONE]: IntrSchemaStrategyOne
}

export const LIST_FIND_STRATEGIES = [
    StrategyOne,
]

@Injectable()
export class ServiceFindStatisticPlayer {
    private mapFind = new Map<EnumNameStrategyFindStatisticPlayer, IntrStandartStrategy<EnumNameStrategyFindStatisticPlayer>>();

    constructor(
        private readonly strategyOne: StrategyOne,
    ) { 
        this.mapFind.set(this.strategyOne.name, this.strategyOne);
    }

    async find<M extends EnumNameStrategyFindStatisticPlayer>(
        method: M,
        args: IntrMapStrategyFindStatisticPlayer[M]['args']
    ): Promise<IntrMapStrategyFindStatisticPlayer[M]['return']> {
        const strategy = this.mapFind.get(method);

        if (!strategy) {
            throw new NotImplementedException(`Стратегия поиска статистики пользователя не найдена: ${method}`);
        }

        return await strategy.execute(args) as IntrMapStrategyFindStatisticPlayer[M]['return'];
    }
}