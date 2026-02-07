import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityManager } from 'typeorm';
import { RepoFriendRequest } from 'src/module.api/friends/repositories/friendReguest.repo';
import { IntrResFindRequestByList } from 'src/module.api/friends/interface/service.result/res.FindRequestByList.interface';
import { ServiceFindReguestFriend } from 'src/module.api/friends/services/reguest/findFriendRequest.service';

export interface IntrArgsStrategyByList {
	id: number;
	list: number[];
	manager?: EntityManager;
}

export type TypeReturnStrategyByList = IntrResFindRequestByList;

export interface IntrSchemaStrategyByList
	extends IntrStandartSchemaStrategy<IntrArgsStrategyByList, TypeReturnStrategyByList> {
	args: IntrArgsStrategyByList;
	return: TypeReturnStrategyByList;
}

@Injectable()
export class StrategyByList
	implements IntrStandartStrategy<typeof ServiceFindReguestFriend.strategyName.LIST> {
	readonly name = ServiceFindReguestFriend.strategyName.LIST;

	constructor(private readonly repoFriendRequest: RepoFriendRequest) { }

	async execute(
		args: IntrSchemaStrategyByList['args']
	): Promise<IntrSchemaStrategyByList['return']> {
		const { id, list, manager } = args;
		const listRequest = await this.repoFriendRequest.findRequestByList({
			list: list,
			id: id,
			manager: manager,
		});

		if (listRequest === null || listRequest?.length === 0) {
			return {
				listRequest: [],
			};
		}

		return {
			listRequest,
		};
	}
}
