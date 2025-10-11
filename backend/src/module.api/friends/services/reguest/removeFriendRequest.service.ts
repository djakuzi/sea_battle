import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import {
	IntrSchemaStrategyDefault,
	StrategyDefault,
} from '../../strategies/friendship/remove/default.strategy';

export enum EnumNameStrategy {
	DEFAULT = 'default',
}

export interface IntrMapStrategyRemoveReguestFriend {
	[EnumNameStrategy.DEFAULT]: IntrSchemaStrategyDefault;
}

@Injectable()
export class ServiceRemoveFriendReguest {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyDefault: StrategyDefault) {
		this.mapStrategies.set(this.strategyDefault.name, this.strategyDefault);
	}

	async remove<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyRemoveReguestFriend[M]['args']
	): Promise<IntrMapStrategyRemoveReguestFriend[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия поиска запросов в друзья не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyRemoveReguestFriend[M]['return'];
	}
}
