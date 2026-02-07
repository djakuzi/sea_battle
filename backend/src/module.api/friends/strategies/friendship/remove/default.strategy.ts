import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityFriendship } from 'src/common/entity/game.scheme/friendShip.entity';
import { IntrResultRemoved } from 'src/common/types/result-res-api/resultRemoved.interface';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { RepoFriendShip } from 'src/module.api/friends/repositories/friendship.repo';
import { ServiceRemoveFriendship } from 'src/module.api/friends/services/friendship/removeFriendship.service';
import { EntityManager } from 'typeorm';

export interface IntrArgsStrategyDefault {
	data: Partial<EntityFriendship>;
	manager?: EntityManager;
}

export interface IntrReturnStrategyDefault extends IntrResultRemoved { }

export interface IntrSchemaStrategyDefault
	extends IntrStandartSchemaStrategy<IntrArgsStrategyDefault, IntrReturnStrategyDefault> {
	args: IntrArgsStrategyDefault;
	return: IntrReturnStrategyDefault;
}

@Injectable()
export class StrategyDefault
	implements IntrStandartStrategy<typeof ServiceRemoveFriendship.strategyName.DEFAULT> {
	readonly name = ServiceRemoveFriendship.strategyName.DEFAULT;

	constructor(private readonly repoFriendship: RepoFriendShip) { }

	async execute(
		args: IntrSchemaStrategyDefault['args']
	): Promise<IntrSchemaStrategyDefault['return']> {
		const resDataDelete = {
			id: args.data.id,
			player1Id: args.data.player1Id,
			player2Id: args.data.player2Id,
		};


		const res = await this.repoFriendship.deleteFriendship(resDataDelete, args.manager);
		if (!res) {
			throw new InternalServerErrorException('Произошла ошибка при удалении из друзей');
		}

		if (res.affected === 0) {
			throw new NotFoundException('Данная дружба не найдена');
		}

		return {
			isRemoved: true,
			message: 'Удален из друзей',
		};
	}
}
