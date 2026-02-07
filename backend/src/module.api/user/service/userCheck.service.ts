import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import { IntrSchemaStrategyOne } from '../strategies/find/one.strategy';
import { StrategyAvailability } from '../strategies/check/availability';

export enum EnumNameStrategy {
	AVAILABILITY = 'availability',
}

export interface IntrMapStrategyCheckUser {
	[EnumNameStrategy.AVAILABILITY]: IntrSchemaStrategyOne;
}

@Injectable()
export class ServiceUserCheck {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyAvailability: StrategyAvailability) {
		this.mapStrategies.set(this.strategyAvailability.name, this.strategyAvailability);
	}

	async check<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyCheckUser[M]['args']
	): Promise<IntrMapStrategyCheckUser[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия проверки пользователя не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyCheckUser[M]['return'];
	}
}
