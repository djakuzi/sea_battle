import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { IntrResActionFriend } from 'src/module.api/friends/interface/service.result/res.ActionFriend.interface';
import { EntityManager } from 'typeorm';
import { ServiceFindReguestFriend } from 'src/module.api/friends/services/reguest/findFriendRequest.service';
import { ServiceGetFriendAction } from 'src/module.api/friends/services/action/getFriendAction.service';
import { ServiceIsFriendShip } from 'src/module.api/friends/services/friendship/isFriendShip.service';

export interface IntrArgsStrategyListAction {
	id: number;
	list: number[];
	manager?: EntityManager;
}

export type TypeReturnStrategyListAction = IntrResActionFriend;

export interface IntrSchemaStrategyListAction
	extends IntrStandartSchemaStrategy<IntrArgsStrategyListAction, TypeReturnStrategyListAction> {
	args: IntrArgsStrategyListAction;
	return: TypeReturnStrategyListAction;
}

@Injectable()
export class StrategyListAction
	implements IntrStandartStrategy<typeof ServiceGetFriendAction.strategyName.LIST_ACTION> {
	readonly name = ServiceGetFriendAction.strategyName.LIST_ACTION;

	constructor(
		private readonly serviceIsFriendship: ServiceIsFriendShip,
		private readonly friendFindRequestService: ServiceFindReguestFriend
	) { }

	async execute(
		args: IntrSchemaStrategyListAction['args']
	): Promise<IntrSchemaStrategyListAction['return'] | null> {
		const resIsListFriends = await this.serviceIsFriendship.is(
			ServiceIsFriendShip.strategyName.LIST,
			{
				id: args.id,
				list: args.list,
				manager: args.manager,
			}
		);

		const argsFindRequest = {
			id: args.id,
			list: args.list,
			manager: args.manager,
		};

		const resListRequest = await this.friendFindRequestService.find(
			ServiceFindReguestFriend.strategyName.LIST,
			argsFindRequest
		);

		const result: IntrResActionFriend['listActions'] = [];

		const friendMap = new Map<number, boolean>();
		for (const item of resIsListFriends.listIsFriends) {
			friendMap.set(item.idPlayer, item.isFriend);
		}

		const requestMap = new Map<number, { idRequest: number; action: 'accept' | 'close' }>();

		for (const req of resListRequest.listRequest) {
			if (!req.id) continue;

			if (req.senderId === args.id) {
				requestMap.set(req.receiverId!, { idRequest: req.id, action: 'close' });
			} else if (req.receiverId === args.id) {
				requestMap.set(req.senderId!, { idRequest: req.id, action: 'accept' });
			}
		}

		for (const targetId of args.list) {
			if (targetId === args.id) continue;

			if (friendMap.get(targetId)) {
				result.push({
					idRequest: targetId,
					idPlayer: targetId,
					action: 'delete',
				});
			} else if (requestMap.has(targetId)) {
				result.push({
					idRequest: requestMap.get(targetId)?.idRequest,
					idPlayer: targetId,
					action: requestMap.get(targetId)!.action,
				});
			} else {
				result.push({ idPlayer: targetId, action: 'add' });
			}
		}

		return { listActions: result };
	}
}
