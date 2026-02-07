import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { buildConditionsFindWhere } from 'src/common/util/repository/conditions';
import { ServiceFindStatisticPlayer } from '../../services/findStatisticPlayer.service';
import { StatisticPlayersRepository } from '../../repositories/statistic-players.repo';
import { EntityStatisticPlayers } from 'src/common/entity/game.scheme/statistic-players.entity';

export interface IntrArgsStrategyOne {
	filter: {
		player_id?: number;
		id?: number;
	};
	manager?: EntityManager;
}

export type TypeReturnStrategyOne = EntityStatisticPlayers | null;

export interface IntrSchemaStrategyOne
	extends IntrStandartSchemaStrategy<IntrArgsStrategyOne, TypeReturnStrategyOne> {
	args: IntrArgsStrategyOne;
	return: TypeReturnStrategyOne;
}

@Injectable()
export class StrategyOne
	implements IntrStandartStrategy<typeof ServiceFindStatisticPlayer.strategyName.ONE> {
	readonly name = ServiceFindStatisticPlayer.strategyName.ONE;

	constructor(private readonly repoStatisticPlayers: StatisticPlayersRepository) { }

	async execute(args: IntrSchemaStrategyOne['args']): Promise<IntrSchemaStrategyOne['return']> {
		const conditions = buildConditionsFindWhere<
			EntityStatisticPlayers,
			Partial<EntityStatisticPlayers>
		>(args.filter, 'OR');
		
		if (!conditions) return null;

		const statistic = await this.repoStatisticPlayers.findOne(conditions, args.manager);

		return statistic;
	}
}
