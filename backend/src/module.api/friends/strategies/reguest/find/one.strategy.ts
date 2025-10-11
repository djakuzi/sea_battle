import { Injectable, NotFoundException } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityManager } from 'typeorm';
import { ServiceFindReguestFriend } from 'src/module.api/friends/services/reguest/findFriendRequest.service';
import { FriendRequestRepository } from 'src/module.api/friends/repositories/friendReguest.repository';
import { EntityFriendRequest } from 'src/common/entity/game.scheme/friendRequest.entity';

export interface IntrArgsStrategyOne {
	data: Partial<EntityFriendRequest>;
	manager?: EntityManager;
}

export type TypeReturnStrategyOne = EntityFriendRequest;

export interface IntrSchemaStrategyOne
	extends IntrStandartSchemaStrategy<IntrArgsStrategyOne, TypeReturnStrategyOne> {
	args: IntrArgsStrategyOne;
	return: TypeReturnStrategyOne;
}

@Injectable()
export class StrategyOne
	implements IntrStandartStrategy<typeof ServiceFindReguestFriend.strategyName.ONE> {
	readonly name = ServiceFindReguestFriend.strategyName.ONE;

	constructor(private readonly repoFriendRequest: FriendRequestRepository) { }

	async execute(args: IntrSchemaStrategyOne['args']): Promise<IntrSchemaStrategyOne['return']> {
		const result = await this.repoFriendRequest.findOneRequest(args.data, args.manager);

		if (!result) {
			throw new NotFoundException('Данная заявка в друзья не найдена');
		}

		return result;
	}
}
