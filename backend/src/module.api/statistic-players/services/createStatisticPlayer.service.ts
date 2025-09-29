import { Injectable, NotImplementedException } from "@nestjs/common";
import { IntrSchemaStrategyDefault, StrategyDefault } from "../strategies/creative/default.strategy";
import { IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";

export enum EnumNameStrategyCreativeStatisticPlayer {
    DEFAULT = 'default',
}

export interface IntrMapStrategyCreativeStatisticPlayer {
    [EnumNameStrategyCreativeStatisticPlayer.DEFAULT]: IntrSchemaStrategyDefault
}

export const LIST_СREATIVE_STRATEGIES = [
    StrategyDefault,
]

@Injectable()
export class ServiceCreativeStatisticPlayer {
    private mapCreative = new Map<EnumNameStrategyCreativeStatisticPlayer, IntrStandartStrategy<EnumNameStrategyCreativeStatisticPlayer>>();

    constructor(
        private readonly strategyDefault: StrategyDefault,
    ) { 
        this.mapCreative.set(this.strategyDefault.name, this.strategyDefault);
    }

    async create<M extends EnumNameStrategyCreativeStatisticPlayer>(
        method: M,
        args: IntrMapStrategyCreativeStatisticPlayer[M]['args']
    ): Promise<IntrMapStrategyCreativeStatisticPlayer[M]['return']> {
        const strategy = this.mapCreative.get(method);

        if (!strategy) {
            throw new NotImplementedException(`Стратегия создания статистики пользователя не найдена: ${method}`);
        }

        return await strategy.execute(args) as IntrMapStrategyCreativeStatisticPlayer[M]['return'];
    }
}