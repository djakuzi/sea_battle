import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IntrFriendship } from 'src/common/types/friend/friendship.interface';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { FriendShipRepository } from 'src/module.api/friends/repositories/friendship.repository';
import { ServiceCreateFriendship } from 'src/module.api/friends/services/friendship/createFriendShip.service';
import { EntityManager } from 'typeorm';

export interface IntrArgsStrategyDefault extends IntrFriendship {
	manager: EntityManager;
}

export interface IntrReturnStrategyDefault {
	isCreated: boolean;
}

export interface IntrSchemaStrategyDefault
	extends IntrStandartSchemaStrategy<IntrArgsStrategyDefault, IntrReturnStrategyDefault> {
	args: IntrArgsStrategyDefault;
	return: IntrReturnStrategyDefault;
}

@Injectable()
export class StrategyDefault
	implements IntrStandartStrategy<typeof ServiceCreateFriendship.strategyName.DEFAULT> {
	readonly name = ServiceCreateFriendship.strategyName.DEFAULT;

	constructor(private readonly repoFriendship: FriendShipRepository) { }

	async execute(
		args: IntrSchemaStrategyDefault['args']
	): Promise<IntrSchemaStrategyDefault['return']> {
		const res = await this.repoFriendship.createFriendship(
			args.player1Id,
			args.player2Id,
			args.manager
		);

		if (!res) {
			throw new InternalServerErrorException(
				'Произошла ошибка при добавлении в друзья игрока'
			);
		}

		return {
			isCreated: true,
		};
	}
}
