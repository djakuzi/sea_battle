import { Injectable, NotImplementedException } from '@nestjs/common';
import { UsersRepository } from 'src/module.api/user/repositories/users.repository';
import { IntrSchemaStrategyMore, StrategyMore } from '../strategies/find/more.strategy';
import { IntrSchemaStrategyMe, StrategyMe } from '../strategies/find/me.strategy';
import { IntrStandartStrategy } from 'src/common/type/strategy/standartStrategy.interface';
import { IntrSchemaStrategyOne, StrategyOne } from '../strategies/find/one.strategy';


export enum EnumNameStrategyFindUser {
    ONE = 'one',
    MORE = 'more',
    ME = 'ME'
}

export interface IntrMapStrategyFindUser {
    [EnumNameStrategyFindUser.ONE]: IntrSchemaStrategyOne
    [EnumNameStrategyFindUser.MORE]: IntrSchemaStrategyMore,
    [EnumNameStrategyFindUser.ME]: IntrSchemaStrategyMe,
}

export const LIST_FIND_STRATEGIES = [
    StrategyOne,
    StrategyMore,
    StrategyMe
]

@Injectable()
export class ServiceUserFind {
    private mapFind = new Map<EnumNameStrategyFindUser, IntrStandartStrategy<EnumNameStrategyFindUser>>();

    constructor(
        private readonly repoUsers: UsersRepository,
        private readonly strategyOne: StrategyOne,
        private readonly strategyMore: StrategyMore,
        private readonly strategyMe: StrategyMe
    ) { 
        this.mapFind.set(this.strategyOne.name, this.strategyOne);
        this.mapFind.set(this.strategyMore.name, this.strategyMore);
        this.mapFind.set(this.strategyMe.name, this.strategyMe);
    }

    async find<M extends EnumNameStrategyFindUser>(
        method: M,
        args: IntrMapStrategyFindUser[M]['args']
    ): Promise<IntrMapStrategyFindUser[M]['return']> {
        const strategy = this.mapFind.get(method);

        if (!strategy) {
            throw new NotImplementedException(`Стратегия поиска пользователя не найдена: ${method}`);
        }

        return await strategy.execute(args) as IntrMapStrategyFindUser[M]['return'];
    }
}
