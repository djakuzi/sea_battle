import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityManager } from 'typeorm';
import { RepoGet } from '../../repositories/get.repo';
import { ServiceGetBattles } from '../../services/getBattles.service';
import { buildConditionsFindWhere } from 'src/common/util/repository/conditions';
import { EntityOneVsOne } from 'src/common/entity/battles.sheme/oneVsOne.entity';

export interface IntrArgsStrategyOneVsOne {
	idPlayer: string | number;
	manager?: EntityManager;
}

export type TypeReturnStrategyOneVsOne = {
	id: number,
	idWinner: string;
	durationGame: number,
}[] | null;

export interface IntrSchemaStrategyOneVsOne
	extends IntrStandartSchemaStrategy<
		IntrArgsStrategyOneVsOne,
		TypeReturnStrategyOneVsOne
	> {
	args: IntrArgsStrategyOneVsOne;
	return: TypeReturnStrategyOneVsOne;
}

@Injectable()
export class StrategyOneVsOne
	implements IntrStandartStrategy<typeof ServiceGetBattles.strategyName.ONE_VS_ONE> {
	readonly name = ServiceGetBattles.strategyName.ONE_VS_ONE;

	constructor(private readonly repo: RepoGet) {}

	async execute(
		args: IntrSchemaStrategyOneVsOne['args']
	): Promise<IntrSchemaStrategyOneVsOne['return']> {
		const conditions = buildConditionsFindWhere<EntityOneVsOne, Partial<EntityOneVsOne>>({
			id_player1: String(args.idPlayer),
			id_player2: String(args.idPlayer),
		}, 'OR');

		if (!conditions) return null;

		const battles = await this.repo.getOneVsOne(conditions);

		if (!battles || battles.length === 0) return null;
		
		const resBattles = battles.map(battle => {
			return {
				id: battle.id,
				idWinner: battle.id_winner,
				durationGame: battle.duration_game,
			};
		});

		return resBattles;
	}
}
