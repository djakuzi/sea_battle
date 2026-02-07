import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityManager } from 'typeorm';
import { EntityFriendRequest } from 'src/common/entity/game.scheme/friendRequest.entity';
import { buildConditionsFindWhere } from 'src/common/util/repository/conditions';
import { RepoFriendRequest } from 'src/module.api/friends/repositories/friendReguest.repo';
import { ServiceGetReguestFriend } from 'src/module.api/friends/services/reguest/getFriendRequest.service';

export interface IntrArgsStrategyReceivedRequests {
	idPlayer: number;
	type: 'incoming-request' | 'outgoing-request';
	manager?: EntityManager;
}

export type TypeReturnStrategyReceivedRequests = EntityFriendRequest[];

export interface IntrSchemaStrategyReceivedRequests
	extends IntrStandartSchemaStrategy<
		IntrArgsStrategyReceivedRequests,
		TypeReturnStrategyReceivedRequests
	> {
	args: IntrArgsStrategyReceivedRequests;
	return: TypeReturnStrategyReceivedRequests;
}

@Injectable()
export class StrategyReceivedRequests
	implements IntrStandartStrategy<typeof ServiceGetReguestFriend.strategyName.RECEIVED_REQUESTS> {
	readonly name = ServiceGetReguestFriend.strategyName.RECEIVED_REQUESTS;

	constructor(private readonly repoFriendRequest: RepoFriendRequest) { }

	async execute(
		args: IntrSchemaStrategyReceivedRequests['args']
	): Promise<IntrSchemaStrategyReceivedRequests['return'] | null> {
		const filter: Partial<EntityFriendRequest> = {
			receiverId: args.idPlayer,
		};

		const conditions = buildConditionsFindWhere<
			EntityFriendRequest,
			Partial<EntityFriendRequest>
		>(filter, 'AND');
		if (!conditions) {
			throw new BadRequestException('Некорректные данные запроса. Попробуйте ещё раз.');
		}

		const res = await this.repoFriendRequest.findRequests(conditions, args.manager);

		if (res === null || res.length === 0) {
			throw new NotFoundException('Заявки не найдены.');
		}

		return res;
	}
}
