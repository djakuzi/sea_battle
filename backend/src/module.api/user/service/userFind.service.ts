import { Injectable, NotImplementedException } from '@nestjs/common';
import { UsersRepository } from 'src/module.api/user/repositories/users.repository';
import { IntrSchemaStrategyMore, StrategyMore } from '../strategies/find/more.strategy';
import { IntrSchemaStrategyMe, StrategyMe } from '../strategies/find/me.strategy';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import { IntrSchemaStrategyOne, StrategyOne } from '../strategies/find/one.strategy';

export enum EnumNameStrategy {
	ONE = 'one',
	MORE = 'more',
	ME = 'ME',
}

export interface IntrMapStrategyFindUser {
	[EnumNameStrategy.ONE]: IntrSchemaStrategyOne;
	[EnumNameStrategy.MORE]: IntrSchemaStrategyMore;
	[EnumNameStrategy.ME]: IntrSchemaStrategyMe;
}

@Injectable()
export class ServiceUserFind {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(
		private readonly repoUsers: UsersRepository,
		private readonly strategyOne: StrategyOne,
		private readonly strategyMore: StrategyMore,
		private readonly strategyMe: StrategyMe
	) {
		this.mapStrategies.set(this.strategyOne.name, this.strategyOne);
		this.mapStrategies.set(this.strategyMore.name, this.strategyMore);
		this.mapStrategies.set(this.strategyMe.name, this.strategyMe);
	}

	async find<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyFindUser[M]['args']
	): Promise<IntrMapStrategyFindUser[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия поиска пользователя не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyFindUser[M]['return'];
	}
}
