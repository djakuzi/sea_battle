import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import StrategyFullFields, {
	IntrSchemaStrategyFullFields,
} from '../strategies/update/fullFields.strategy';

export enum EnumNameStrategy {
	FULL_FIELDS = 'full-fields',
}

export interface IntrMapStrategyUpdateUser {
	[EnumNameStrategy.FULL_FIELDS]: IntrSchemaStrategyFullFields;
}

@Injectable()
export class ServiceUserUpdate {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyFullFields: StrategyFullFields) {
		this.mapStrategies.set(this.strategyFullFields.name, this.strategyFullFields);
	}

	async update<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyUpdateUser[M]['args']
	): Promise<IntrMapStrategyUpdateUser[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия получения данных игрока не найдена: ${method}`
			);
		}

		return strategy.execute(args) as IntrMapStrategyUpdateUser[M]['return'];
	}
}
