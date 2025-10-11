import { Injectable } from '@nestjs/common';
import { IntrResResponse } from 'src/common/types/result-res-api/resultResponse.interface';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { ServiceCreateFriendship } from 'src/module.api/friends/services/friendship/createFriendShip.service';
import { ServiceAcceptFriendReguest } from 'src/module.api/friends/services/reguest/acceptFriendRequest.service';
import { ServiceFindReguestFriend } from 'src/module.api/friends/services/reguest/findFriendRequest.service';
import { ServiceRemoveFriendReguest } from 'src/module.api/friends/services/reguest/removeFriendRequest.service';
import { DataSource } from 'typeorm';

export interface IntrArgsStrategyDefault {
	idRequest: number;
}

export interface IntrReturnStrategyDefault extends IntrResResponse { }

export interface IntrSchemaStrategyDefault
	extends IntrStandartSchemaStrategy<IntrArgsStrategyDefault, IntrReturnStrategyDefault> {
	args: IntrArgsStrategyDefault;
	return: IntrReturnStrategyDefault;
}

@Injectable()
export class StrategyDefault
	implements IntrStandartStrategy<typeof ServiceAcceptFriendReguest.strategyName.DEFAULT> {
	readonly name = ServiceAcceptFriendReguest.strategyName.DEFAULT;

	constructor(
		private readonly dataSource: DataSource,
		private readonly serviceFindReguest: ServiceFindReguestFriend,
		private readonly serviceCreateFriendship: ServiceCreateFriendship,
		private readonly serviceRemoveFriendReguest: ServiceRemoveFriendReguest
	) { }

	async execute(
		args: IntrSchemaStrategyDefault['args']
	): Promise<IntrSchemaStrategyDefault['return']> {
		return await this.dataSource.transaction(async (manager) => {
			const friendRequest = await this.serviceFindReguest.find(
				ServiceFindReguestFriend.strategyName.ONE,
				{
					data: { id: args.idRequest },
					manager: manager,
				}
			);

			await this.serviceCreateFriendship.create(
				ServiceCreateFriendship.strategyName.DEFAULT,
				{
					player1Id: friendRequest.senderId,
					player2Id: friendRequest.receiverId,
					manager: manager,
				}
			);

			await this.serviceRemoveFriendReguest.remove(
				ServiceRemoveFriendReguest.strategyName.DEFAULT,
				{
					data: { id: args.idRequest },
					manager: manager,
				}
			);

			return {
				isSucces: true,
				message: 'Заявка в друзья принята',
			};
		});
	}
}
