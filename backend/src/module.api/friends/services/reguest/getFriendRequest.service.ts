import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import {
	IntrSchemaStrategyReceivedRequests,
	StrategyReceivedRequests,
} from '../../strategies/reguest/get/receivedRequests.strategy';

export enum EnumNameStrategy {
	RECEIVED_REQUESTS = 'received-requests',
}

export interface IntrMapStrategyGetReguestFriend {
	[EnumNameStrategy.RECEIVED_REQUESTS]: IntrSchemaStrategyReceivedRequests;
}

@Injectable()
export class ServiceGetReguestFriend {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyReguestFriend: StrategyReceivedRequests) {
		this.mapStrategies.set(this.strategyReguestFriend.name, this.strategyReguestFriend);
	}

	async get<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyGetReguestFriend[M]['args']
	): Promise<IntrMapStrategyGetReguestFriend[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия получения взаимодействия с друзьяями не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyGetReguestFriend[M]['return'];
	}
}
