import { forwardRef, Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import { IntrSchemaStrategyOneVsOne, StrategyOneVsOne } from '../strategies/update/OneVsOne.strategy';

export enum EnumNameStrategy {
	OneVsOne = 'OneVsOne',
}

export interface IntrMapStrategyUpdateStatisticPlayer {
	[EnumNameStrategy.OneVsOne]: IntrSchemaStrategyOneVsOne;
}

@Injectable()
export class ServiceUpdateStatisticPlayer {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(
		@Inject(forwardRef(() => StrategyOneVsOne))
		private readonly strategyOneVsOne: StrategyOneVsOne,
	) {
		this.mapStrategies.set(this.strategyOneVsOne.name, this.strategyOneVsOne);
	}

	async update<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyUpdateStatisticPlayer[M]['args']
	): Promise<IntrMapStrategyUpdateStatisticPlayer[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия обновления статистики пользователя не найдена: ${method}`
			);
		}

		return (await strategy.execute(
			args
		)) as IntrMapStrategyUpdateStatisticPlayer[M]['return'];
	}
}
