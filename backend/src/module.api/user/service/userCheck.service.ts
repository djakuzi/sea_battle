import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/type/strategy/standartStrategy.interface';
import { IntrSchemaStrategyOne} from '../strategies/find/one.strategy';
import { StrategyAvailability } from '../strategies/check/availability';

export enum EnumNameStrategyCheckUser {
    AVAILABILITY = 'availability',
}

export interface IntrMapStrategyCheckUser {
    [EnumNameStrategyCheckUser.AVAILABILITY]: IntrSchemaStrategyOne
}

export const LIST_CHECK_STRATEGIES = [
    StrategyAvailability,
]

@Injectable()
export class ServiceUserCheck {
    private mapFind = new Map<EnumNameStrategyCheckUser, IntrStandartStrategy<EnumNameStrategyCheckUser>>();

    constructor(
        private readonly strategyAvailability: StrategyAvailability,
    ) { 
        this.mapFind.set(this.strategyAvailability.name, this.strategyAvailability);
    }

    async check<M extends EnumNameStrategyCheckUser>(
        method: M,
        args: IntrMapStrategyCheckUser[M]['args']
    ): Promise<IntrMapStrategyCheckUser[M]['return']> {
        const strategy = this.mapFind.get(method);

        if (!strategy) {
            throw new NotImplementedException(`Стратегия проверки пользователя не найдена: ${method}`);
        }

        return await strategy.execute(args) as IntrMapStrategyCheckUser[M]['return'];
    }
}
