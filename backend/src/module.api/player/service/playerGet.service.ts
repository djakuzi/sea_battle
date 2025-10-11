import { Injectable, NotImplementedException } from '@nestjs/common';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';
import {
	IntrSchemaStrategyStatusNetwork,
	StrategyStatusNetwork,
} from '../strategies/get/statusNetwork.strategy';
import { IntrSchemaStrategyGuestOrPlayer, StrategyGuestOrPlayer } from '../strategies/get/guestOrPlayer';

export enum EnumNameStrategy {
	STATUS_NETWORK = 'status-network',
	GUEST_OR_PLAYER = 'guest-or-player'
}

export interface IntrMapStrategyGetPlayer {
	[EnumNameStrategy.STATUS_NETWORK]: IntrSchemaStrategyStatusNetwork;
	[EnumNameStrategy.GUEST_OR_PLAYER]: IntrSchemaStrategyGuestOrPlayer;
}

@Injectable()
export class ServicePlayerGet {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(
		private readonly strategyStatusNetwork: StrategyStatusNetwork,
		private readonly strategyGuestOrPlayer: StrategyGuestOrPlayer,
	) {
		this.mapStrategies.set(this.strategyStatusNetwork.name, this.strategyStatusNetwork);
		this.mapStrategies.set(this.strategyGuestOrPlayer.name, this.strategyGuestOrPlayer);
	}

	async get<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyGetPlayer[M]['args']
	): Promise<IntrMapStrategyGetPlayer[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия получения данных игрока не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyGetPlayer[M]['return'];
	}
}
