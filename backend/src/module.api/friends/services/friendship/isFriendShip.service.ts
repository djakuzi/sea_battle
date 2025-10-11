import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import {
	IntrSchemaStrategyByList,
	StrategyByList,
} from '../../strategies/friendship/is/byList.strategy';

export enum EnumNameStrategy {
	LIST = 'list',
}

export interface IntrMapStrategyIsFriendShip {
	[EnumNameStrategy.LIST]: IntrSchemaStrategyByList;
}

@Injectable()
export class ServiceIsFriendShip {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyByList: StrategyByList) {
		this.mapStrategies.set(this.strategyByList.name, this.strategyByList);
	}

	async is<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyIsFriendShip[M]['args']
	): Promise<IntrMapStrategyIsFriendShip[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(`Стратегия проверки на друга не найдена: ${method}`);
		}

		return (await strategy.execute(args)) as IntrMapStrategyIsFriendShip[M]['return'];
	}
}
