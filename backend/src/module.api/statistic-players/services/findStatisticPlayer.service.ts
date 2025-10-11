import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrSchemaStrategyOne, StrategyOne } from '../strategies/find/one.strategy';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';

export enum EnumNameStrategy {
	ONE = 'one',
}

export interface IntrMapStrategyFindStatisticPlayer {
	[EnumNameStrategy.ONE]: IntrSchemaStrategyOne;
}

export const LIST_FIND_STRATEGIES = [StrategyOne];

@Injectable()
export class ServiceFindStatisticPlayer {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyOne: StrategyOne) {
		this.mapStrategies.set(this.strategyOne.name, this.strategyOne);
	}

	async find<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyFindStatisticPlayer[M]['args']
	): Promise<IntrMapStrategyFindStatisticPlayer[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия поиска статистики пользователя не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyFindStatisticPlayer[M]['return'];
	}
}
