import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import {
	IntrSchemaStrategyDefault,
	StrategyDefault,
} from '../../strategies/friendship/remove/default.strategy';
import { Injectable, NotImplementedException } from '@nestjs/common';

export enum EnumNameStrategy {
	DEFAULT = 'default',
}

export interface IntrMapStrategyCreateFriendShip {
	[EnumNameStrategy.DEFAULT]: IntrSchemaStrategyDefault;
}

@Injectable()
export class ServiceRemoveFriendship {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyDefault: StrategyDefault) {
		this.mapStrategies.set(this.strategyDefault.name, this.strategyDefault);
	}

	async remove<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyCreateFriendShip[M]['args']
	): Promise<IntrMapStrategyCreateFriendShip[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(`Стратегия проверки на друга не найдена: ${method}`);
		}

		return (await strategy.execute(args)) as IntrMapStrategyCreateFriendShip[M]['return'];
	}
}
