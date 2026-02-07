import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityStatisticPlayers } from 'src/common/entity/game.scheme/statistic-players.entity';
import { ServiceUpdateStatisticPlayer } from '../../services/updateStatisticPlayer.service';
import { ServiceFindStatisticPlayer } from '../../services/findStatisticPlayer.service';
import { RepoUpdate } from '../../repositories/update.repo';
import { ResultUpdateEntity } from 'src/common/types/entity/ResultUpdateEntity.interface';
import { getInfoUpdateEntity } from 'src/common/util/entity/methods/getInfoUpdateEntity';
import { calculateRatio } from 'src/common/util/calc/methods/calculateRatio';

export interface IntrArgsStrategyOneVsOne {
	search: {
		player_id?: number;
		id?: number;
	}
	data: Partial<EntityStatisticPlayers>;
	manager?: EntityManager;
}

export type TypeReturnStrategyOneVsOne = ResultUpdateEntity;

export interface IntrSchemaStrategyOneVsOne
	extends IntrStandartSchemaStrategy<IntrArgsStrategyOneVsOne, TypeReturnStrategyOneVsOne> {
	args: IntrArgsStrategyOneVsOne;
	return: TypeReturnStrategyOneVsOne;
}

@Injectable()
export class StrategyOneVsOne implements IntrStandartStrategy<typeof ServiceUpdateStatisticPlayer.strategyName.OneVsOne> {
	readonly name = ServiceUpdateStatisticPlayer.strategyName.OneVsOne;

	constructor(
		private readonly repoUpdate: RepoUpdate,
		private readonly serviceFindStatisticPlayers: ServiceFindStatisticPlayer,
	) { }

	async execute(args: IntrSchemaStrategyOneVsOne['args']): Promise<IntrSchemaStrategyOneVsOne['return']> {
		const stats = await this.serviceFindStatisticPlayers.find(
			ServiceFindStatisticPlayer.strategyName.ONE, {
			filter: args.search
		});

		if (!stats) {
			console.warn(`Статистика для игрока с ID ${args.search.player_id} не найдена`);
			return {
				isUpdate: false,
				message: `Статистика для игрока с ID ${args.search.player_id} не найдена`,
				result: {
					raw: null,
					generatedMaps: []
				},
			}
		}

		const updateStats: Partial<EntityStatisticPlayers> = {
			quantity_battles: stats.quantity_battles + (args.data.quantity_battles || 0),
			quantity_losses: stats.quantity_losses + (args.data.quantity_losses || 0),
			quantity_wins: stats.quantity_wins + (args.data.quantity_wins || 0),
			classic_battles_wins: stats.classic_battles_wins + (args.data.classic_battles_wins || 0),
			shots_taken: stats.shots_taken + (args.data.shots_taken || 0),
			shots_hit: stats.shots_hit + (args.data.shots_hit || 0),
		};

		updateStats.hit_accuracy = calculateRatio(updateStats?.shots_hit ?? 0, updateStats.shots_taken ?? 0);
		updateStats.win_percentage = calculateRatio(updateStats?.quantity_wins ?? 0, updateStats.quantity_battles ?? 0);

		const result = getInfoUpdateEntity(await this.repoUpdate.updateOne(args.search, updateStats));

		if (result.isUpdate) {
			if (args.search.id) {
				console.log(`Обновлена статистика с id ${args.search.id}`);
			}

			if (args.search.player_id) {
				console.log(`Обновлена статистика у игрока с id ${args.search.player_id}`);
			}
		}

		return result;
	}
}
