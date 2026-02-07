
import { Role } from "src/common/types/role";
import { IntrSessionOneVsOne } from "../../../types/session/session.interface";
import { ServiceGameSessions } from "../gameSession.service";
import { EntityStatisticPlayers } from "src/common/entity/game.scheme/statistic-players.entity";
import { ServiceUpdateStatisticPlayer } from "src/module.api/statistic-players/services/updateStatisticPlayer.service";
import { ServiceCreateBattles } from "src/module.api/battles/services/createBattles.service";
import { EntityOneVsOne } from "src/common/entity/battles.sheme/oneVsOne.entity";
import { calculateDurationInMinutes } from "src/common/util/date/methods/calculateDurationInMinutes";

export class Finish {
	private core: ServiceGameSessions;

	constructor(core: ServiceGameSessions) {
		this.core = core;
	}

	async updateStatistic(session: IntrSessionOneVsOne) {
		for (const key in session.session.participants) {
			const participant = session.session.participants[key];

			if (participant.data.type === Role.GUEST ) return;
			
			const isWinner = participant.data.id == session.session.idWinner;
			const statsGame = session.game?.Statistic.getStatisticPlayer(participant.data.id);

			const dataUpdateStatistic:Partial<EntityStatisticPlayers> = {
				quantity_battles: 1,
				quantity_losses: isWinner ? 0 : 1,
				quantity_wins: isWinner ? 1 : 0,
				classic_battles_wins: isWinner ? 1 : 0,
			}

			if (statsGame?.countHits || statsGame?.countShots) {
				dataUpdateStatistic.shots_taken = statsGame?.countShots ?? 0;
				dataUpdateStatistic.shots_hit = statsGame?.countHits ?? 0;
			}

			this.core.serviceUpdateStatisticPlayer.update(
				ServiceUpdateStatisticPlayer.strategyName.OneVsOne,
				{
					search: {
						player_id: +participant.data.id
					},
					data: dataUpdateStatistic
				}
			)
		}
	}

	async createHistoryBattles(session: IntrSessionOneVsOne) {
		const idPlayer = {
			id_player1: '',
			id_player2: '',
		}

		for (const key in session.session.participants) {
			if (!idPlayer.id_player1) {
				idPlayer.id_player1 = session.session.participants[key].data.id;
				continue;
			}

			if (!idPlayer.id_player2) {
				idPlayer.id_player2 = session.session.participants[key].data.id;
				continue;
			}
		}

		const data: Partial<EntityOneVsOne> = {
			id_winner: String(session.session.idWinner),
			duration_game: calculateDurationInMinutes(session.session.startDate, session.session.endDate as Date),
			...idPlayer
		}

		this.core.serviceCreateBattles.create(
			ServiceCreateBattles.strategyName.ONE_VS_ONE, 
			{
				data: data
			}
		)
	}
}