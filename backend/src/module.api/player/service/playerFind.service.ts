import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrSchemaStrategyFindOne, StrategyFindOne } from '../strategies/find/onePlayer.strategy';
import {
	IntrSchemaStrategyFindMore,
	StrategyFindMore,
} from '../strategies/find/morePlayer.strategy';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';

export enum EnumNameStrategy {
	ONE = 'one',
	MORE = 'more',
}

export interface IntrMapStrategyFindPlayer {
	[EnumNameStrategy.MORE]: IntrSchemaStrategyFindMore;
	[EnumNameStrategy.ONE]: IntrSchemaStrategyFindOne;
}

@Injectable()
export class ServicePlayerFind {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(
		private readonly strategyOne: StrategyFindOne,
		private readonly strategyMore: StrategyFindMore
	) {
		this.mapStrategies.set(this.strategyOne.name, this.strategyOne);
		this.mapStrategies.set(this.strategyMore.name, this.strategyMore);
	}

	async find<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyFindPlayer[M]['args']
	): Promise<IntrMapStrategyFindPlayer[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(`Стратегия поиска игрока не найдена: ${method}`);
		}

		return (await strategy.execute(args)) as IntrMapStrategyFindPlayer[M]['return'];
	}
}
