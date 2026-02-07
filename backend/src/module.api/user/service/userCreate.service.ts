import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import { IntrSchemaStrategyDefault, StrategyDefault } from '../strategies/create/default.strategy';
import { Injectable, NotImplementedException } from '@nestjs/common';

export enum EnumNameStrategy {
	DEFAULT = 'default',
}

export interface IntrMapStrategyCreateUser {
	[EnumNameStrategy.DEFAULT]: IntrSchemaStrategyDefault;
}

@Injectable()
export class ServiceCreateUser {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyDefault: StrategyDefault) {
		this.mapStrategies.set(this.strategyDefault.name, this.strategyDefault);
	}

	async create<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyCreateUser[M]['args']
	): Promise<IntrMapStrategyCreateUser[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(`Стратегия создания игрока не найдена: ${method}`);
		}

		return (await strategy.execute(args)) as IntrMapStrategyCreateUser[M]['return'];
	}
}
