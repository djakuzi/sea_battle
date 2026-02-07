import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrSchemaStrategyDefault, StrategyDefault } from '../strategies/create/default.strategy';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';

export enum EnumNameStrategy {
	DEFAULT = 'default',
}

export interface IntrMapStrategyCreativeStatisticPlayer {
	[EnumNameStrategy.DEFAULT]: IntrSchemaStrategyDefault;
}

@Injectable()
export class ServiceCreativeStatisticPlayer {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyDefault: StrategyDefault) {
		this.mapStrategies.set(this.strategyDefault.name, this.strategyDefault);
	}

	async create<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyCreativeStatisticPlayer[M]['args']
	): Promise<IntrMapStrategyCreativeStatisticPlayer[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия создания статистики пользователя не найдена: ${method}`
			);
		}

		return (await strategy.execute(
			args
		)) as IntrMapStrategyCreativeStatisticPlayer[M]['return'];
	}
}
