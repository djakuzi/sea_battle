import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import {
	IntrSchemaStrategyByList,
	StrategyByList,
} from '../../strategies/reguest/find/byList.strategy';
import { IntrSchemaStrategyOne, StrategyOne } from '../../strategies/reguest/find/one.strategy';

export enum EnumNameStrategy {
	ONE = 'one',
	LIST = 'LIST',
}

export interface IntrMapStrategyFindReguestFriend {
	[EnumNameStrategy.ONE]: IntrSchemaStrategyOne;
	[EnumNameStrategy.LIST]: IntrSchemaStrategyByList;
}

@Injectable()
export class ServiceFindReguestFriend {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(
		private readonly strategyOne: StrategyOne,
		private readonly strategyByList: StrategyByList
	) {
		this.mapStrategies.set(this.strategyOne.name, this.strategyOne);
		this.mapStrategies.set(this.strategyByList.name, this.strategyByList);
	}

	async find<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyFindReguestFriend[M]['args']
	): Promise<IntrMapStrategyFindReguestFriend[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия поиска запросов в друзья не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyFindReguestFriend[M]['return'];
	}
}
