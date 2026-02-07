import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import {
	IntrSchemaStrategyMore,
	StrategyMore,
} from '../../strategies/friendship/find/more.strategy';

export enum EnumNameStrategy {
	MORE = 'more',
}

export interface IntrMapStrategyFindFriendShip {
	[EnumNameStrategy.MORE]: IntrSchemaStrategyMore;
}

@Injectable()
export class ServiceFindFriendShip {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyMore: StrategyMore) {
		this.mapStrategies.set(this.strategyMore.name, this.strategyMore);
	}

	async find<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyFindFriendShip[M]['args']
	): Promise<IntrMapStrategyFindFriendShip[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(`Стратегия проверки на друга не найдена: ${method}`);
		}

		return (await strategy.execute(args)) as IntrMapStrategyFindFriendShip[M]['return'];
	}
}
