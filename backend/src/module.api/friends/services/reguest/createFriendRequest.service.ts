import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import {
	StrategyDefault,
	IntrSchemaStrategyDefault,
} from '../../strategies/reguest/create/default.strategy';

export enum EnumNameStrategy {
	DEFAULT = 'default',
}

export interface IntrMapStrategyCreateReguestFriend {
	[EnumNameStrategy.DEFAULT]: IntrSchemaStrategyDefault;
}

@Injectable()
export class ServiceCreateReguestFriend {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyDefalt: StrategyDefault) {
		this.mapStrategies.set(this.strategyDefalt.name, this.strategyDefalt);
	}

	async create<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyCreateReguestFriend[M]['args']
	): Promise<IntrMapStrategyCreateReguestFriend[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия поиска запросов в друзья не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyCreateReguestFriend[M]['return'];
	}
}
