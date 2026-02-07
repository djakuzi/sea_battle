import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import {
	IntrSchemaStrategyStatusNetwork,
	StrategyStatusNetwork,
} from '../strategies/update/statusNetwork.strategy';

export enum EnumNameStrategy {
	STATUS_NETWORK = 'status-network',
	// FULL_FIELDS = 'full-fields',
}

export interface IntrMapStrategyGetPlayer {
	[EnumNameStrategy.STATUS_NETWORK]: IntrSchemaStrategyStatusNetwork;
}

@Injectable()
export class ServicePlayerUpdate {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyStatusNetwork: StrategyStatusNetwork) {
		this.mapStrategies.set(this.strategyStatusNetwork.name, this.strategyStatusNetwork);
	}

	async update<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyGetPlayer[M]['args']
	): Promise<IntrMapStrategyGetPlayer[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия получения данных игрока не найдена: ${method}`
			);
		}

		return strategy.execute(args) as IntrMapStrategyGetPlayer[M]['return'];
	}
}
