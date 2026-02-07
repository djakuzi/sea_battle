import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityManager } from 'typeorm';
import { ServicePlayerGet } from '../../service/playerGet.service';
import { isGuest } from 'src/common/util/guest/methods/isGuest';
import { createGuest } from 'src/common/util/guest/methods/createGuest';
import { TypePlayerOrGuest, TypePlayerType } from 'src/common/types/player/typePlayer.type';
import { ServicePlayerFind } from '../../service/playerFind.service';
import { Role } from 'src/common/types/role';

export interface IntrArgsStrategyGuestOrPlayer {
	id: string;
	manager?: EntityManager;
}

export type TypeReturnStrategyGuestOrPlayer = {
	player: TypePlayerOrGuest,
	type: TypePlayerType,
};

export interface IntrSchemaStrategyGuestOrPlayer
	extends IntrStandartSchemaStrategy<
		IntrArgsStrategyGuestOrPlayer,
		TypeReturnStrategyGuestOrPlayer
	> {
	args: IntrArgsStrategyGuestOrPlayer;
	return: TypeReturnStrategyGuestOrPlayer;
}

@Injectable()
export class StrategyGuestOrPlayer
	implements IntrStandartStrategy<typeof ServicePlayerGet.strategyName.GUEST_OR_PLAYER> {
	readonly name = ServicePlayerGet.strategyName.GUEST_OR_PLAYER;

	constructor(
		private readonly servicePlayerFind: ServicePlayerFind,
	) { }

	async execute(
		args: IntrSchemaStrategyGuestOrPlayer['args']
	): Promise<IntrSchemaStrategyGuestOrPlayer['return']> {
		const resultIsGuest = isGuest(args.id);
		
		if (resultIsGuest) {
			return {
				player: createGuest(args.id),
				type: Role.GUEST,
			}
		} else {
	
			const player = await this.servicePlayerFind.find(ServicePlayerFind.strategyName.ONE, {
				filter: {
					id: Number(args.id),
				}
			});
			return {
				player: player,
				type: Role.PLAYER,
			}
		}
	}
}
