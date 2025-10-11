import { Injectable, NotImplementedException } from '@nestjs/common';
import {
	StrategyDefault,
	IntrSchemaStrategyDefault,
} from '../../strategies/reguest/accept/default.strategy';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';

export enum EnumNameStrategy {
	DEFAULT = 'default',
}

export interface IntrMapStrategyAccept {
	[EnumNameStrategy.DEFAULT]: IntrSchemaStrategyDefault;
}

@Injectable()
export class ServiceAcceptFriendReguest {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyDefalt: StrategyDefault) {
		this.mapStrategies.set(this.strategyDefalt.name, this.strategyDefalt);
	}

	async accept<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyAccept[M]['args']
	): Promise<IntrMapStrategyAccept[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия поиска запросов в друзья не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyAccept[M]['return'];
	}
}
