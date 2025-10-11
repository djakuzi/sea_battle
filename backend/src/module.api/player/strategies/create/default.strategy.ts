import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { IntrFriendship } from 'src/common/types/friend/friendship.interface';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityManager } from 'typeorm';
import { PlayerRepository } from '../../repositories/player.repository';
import { ServiceCreatePlayer } from '../../service/createPlayer.service';

export interface IntrArgsStrategyDefault {
	data: Partial<EntityPlayer>;
	manager?: EntityManager;
}

export interface IntrSchemaStrategyDefault
	extends IntrStandartSchemaStrategy<IntrArgsStrategyDefault, EntityPlayer> {
	args: IntrArgsStrategyDefault;
	return: EntityPlayer;
}

@Injectable()
export class StrategyDefault
	implements IntrStandartStrategy<typeof ServiceCreatePlayer.strategyName.DEFAULT> {
	readonly name = ServiceCreatePlayer.strategyName.DEFAULT;

	constructor(private readonly repoPlayer: PlayerRepository) { }

	async execute(
		args: IntrSchemaStrategyDefault['args']
	): Promise<IntrSchemaStrategyDefault['return']> {
		const res = await this.repoPlayer.createPlayer(args.data, args.manager);

		if (!res) throw new InternalServerErrorException('Произошла ошибка при создании игрока');

		return res;
	}
}
