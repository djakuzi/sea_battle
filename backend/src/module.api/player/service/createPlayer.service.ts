import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import { IntrSchemaStrategyDefault, StrategyDefault } from '../strategies/create/default.strategy';

export enum EnumNameStrategy {
	DEFAULT = 'default',
}

export interface IntrMapStrategyCreatePlayer {
	[EnumNameStrategy.DEFAULT]: IntrSchemaStrategyDefault;
}

@Injectable()
export class ServiceCreatePlayer {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyDefault: StrategyDefault) {
		this.mapStrategies.set(this.strategyDefault.name, this.strategyDefault);
	}

	async create<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyCreatePlayer[M]['args']
	): Promise<IntrMapStrategyCreatePlayer[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(`Стратегия поиска игрока не найдена: ${method}`);
		}

		return (await strategy.execute(args)) as IntrMapStrategyCreatePlayer[M]['return'];
	}
}
