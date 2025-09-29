import { IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";
import { IntrSchemaStrategyDefault, StrategyDefault } from "../strategies/creative/default.strategy";
import { Injectable, NotImplementedException } from "@nestjs/common";

export enum EnumNameStrategyCreateUser {
    DEFAULT = 'default',
}

export interface IntrMapStrategyCreateUser {
    [EnumNameStrategyCreateUser.DEFAULT]: IntrSchemaStrategyDefault
}

export const LIST_СREATIVE_STRATEGIES = [
    StrategyDefault,
]

@Injectable()
export class ServiceCreateUser {
    private mapCreative = new Map<EnumNameStrategyCreateUser, IntrStandartStrategy<EnumNameStrategyCreateUser>>();

    constructor(
        private readonly strategyDefault: StrategyDefault,
    ) { 
        this.mapCreative.set(this.strategyDefault.name, this.strategyDefault);
    }

    async create<M extends EnumNameStrategyCreateUser>(
        method: M,
        args: IntrMapStrategyCreateUser[M]['args']
    ): Promise<IntrMapStrategyCreateUser[M]['return']> {
        const strategy = this.mapCreative.get(method);

        if (!strategy) {
            throw new NotImplementedException(`Стратегия создания игрока не найдена: ${method}`);
        }

        return await strategy.execute(args) as IntrMapStrategyCreateUser[M]['return'];
    }
}