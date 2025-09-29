import { Injectable, NotImplementedException } from "@nestjs/common";
import { IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";
import { IntrSchemaStrategyFullFields, StrategyFullFields } from "../strategies/update/fullFields.strategy";

export enum EnumNameStrategyUpdateUser {
    FULL_FIELDS = 'full-fields',
}

export interface IntrMapStrategyUpdateUser {
    [EnumNameStrategyUpdateUser.FULL_FIELDS]: IntrSchemaStrategyFullFields,
}

@Injectable()
export class UserUpdateService {
    private mapGetPlayers = new Map<EnumNameStrategyUpdateUser, IntrStandartStrategy<EnumNameStrategyUpdateUser>>();
    
    constructor(
        private readonly strategyFullFields: StrategyFullFields
    ) {
        this.mapGetPlayers.set(this.strategyFullFields.name, this.strategyFullFields);
    }

    async update<M extends EnumNameStrategyUpdateUser>(
        method: M,
        args: IntrMapStrategyUpdateUser[M]['args']
    ): Promise<IntrMapStrategyUpdateUser[M]['return']> {
        const strategy = this.mapGetPlayers.get(method);

        if (!strategy) {
            throw new NotImplementedException(`Стратегия получения данных игрока не найдена: ${method}`);
        }

        return strategy.execute(args) as IntrMapStrategyUpdateUser[M]['return'];
    }
}