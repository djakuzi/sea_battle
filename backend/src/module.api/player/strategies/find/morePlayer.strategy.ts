import { Injectable, ConflictException } from '@nestjs/common';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { RepoPlayer } from '../../repositories/player.repo';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { ServicePlayerFind } from '../../service/playerFind.service';

export interface IntrArgsStrategyFindMore {
	filter: Partial<EntityPlayer>;
}

export interface TypeReturnStrategyFindMore {
	players: EntityPlayer[];
}

export interface IntrSchemaStrategyFindMore
	extends IntrStandartSchemaStrategy<IntrArgsStrategyFindMore, TypeReturnStrategyFindMore> {
	args: IntrArgsStrategyFindMore;
	return: TypeReturnStrategyFindMore;
}

@Injectable()
export class StrategyFindMore
	implements IntrStandartStrategy<typeof ServicePlayerFind.strategyName.MORE> {
	readonly name = ServicePlayerFind.strategyName.MORE;

	constructor(private readonly repoPlayer: RepoPlayer) { }

	async execute(
		data: IntrSchemaStrategyFindMore['args']
	): Promise<IntrSchemaStrategyFindMore['return'] | null> {
		const players = await this.repoPlayer.findPlayers(data.filter);

		if (!players || players?.length == 0) {
			throw new ConflictException('Игроки не найдены');
		}

		return {
			players: players,
		};
	}
}
