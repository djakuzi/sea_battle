import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { RepoFriendShip } from 'src/module.api/friends/repositories/friendship.repo';
import { ServiceFindFriendShip } from 'src/module.api/friends/services/friendship/findFriendShip.service';

export interface IntrArgsStrategyMore {
	idPlayer: number;
}

export interface IntrReturnStrategyMore {
	friends: Partial<EntityPlayer>[];
}

export interface IntrSchemaStrategyMore
	extends IntrStandartSchemaStrategy<IntrArgsStrategyMore, IntrReturnStrategyMore> {
	args: IntrArgsStrategyMore;
	return: IntrReturnStrategyMore;
}

@Injectable()
export class StrategyMore
	implements IntrStandartStrategy<typeof ServiceFindFriendShip.strategyName.MORE> {
	readonly name = ServiceFindFriendShip.strategyName.MORE;

	constructor(private readonly repoFriendship: RepoFriendShip) { }

	async execute(args: IntrSchemaStrategyMore['args']): Promise<IntrSchemaStrategyMore['return']> {
		const res = await this.repoFriendship.findFriendships({
			idPlayer: args.idPlayer,
			fields: ['id', 'avatar', 'is_online', 'last_online', 'experience', 'nickname'],
		});

		return {
			friends: res ? res : [],
		};
	}
}
