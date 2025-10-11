import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityManager } from 'typeorm';
import { FriendShipRepository } from 'src/module.api/friends/repositories/friendship.repository';
import { IntrIsFriendships } from 'src/module.api/friends/interface/isFriends.interface';
import { ServiceIsFriendShip } from 'src/module.api/friends/services/friendship/isFriendShip.service';

export interface IntrArgsStrategyByList {
	id: number;
	list: number[];
	manager?: EntityManager;
}

export interface IntrReturnStrategyByList {
	listIsFriends: IntrIsFriendships[];
}

export interface IntrSchemaStrategyByList
	extends IntrStandartSchemaStrategy<IntrArgsStrategyByList, IntrReturnStrategyByList> {
	args: IntrArgsStrategyByList;
	return: IntrReturnStrategyByList;
}

@Injectable()
export class StrategyByList
	implements IntrStandartStrategy<typeof ServiceIsFriendShip.strategyName.LIST> {
	readonly name = ServiceIsFriendShip.strategyName.LIST;

	constructor(private readonly repoFriendship: FriendShipRepository) { }

	async execute(
		args: IntrSchemaStrategyByList['args']
	): Promise<IntrSchemaStrategyByList['return']> {
		const dataRepo = {
			id: args.id,
			list: args.list,
			manager: args.manager,
		};

		const friendships = await this.repoFriendship.findFriendsByList(dataRepo);

		if (friendships === null || friendships?.length === 0) {
			return {
				listIsFriends: [],
			};
		}

		const friendIds = new Set<number>();

		friendships.forEach((f) => {
			const friendId = f.player1Id === args.id ? f.player2Id : f.player1Id;
			friendIds.add(friendId);
		});

		return {
			listIsFriends: args.list.map((playerId) => ({
				idPlayer: playerId,
				isFriend: friendIds.has(playerId),
			})),
		};
	}
}
