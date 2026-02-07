import { CoreGame } from "../coreGame";
import { IntrStatisticParticipants } from "../types/statistic/statisticParticipants.interface";
import { IntrInfoParticipants } from "../types/gameParticipants.interface";

export class Core {
	private core: CoreGame;

	winnerParticipant: string | null;

	protected _statisticPlayer: Map<string, IntrStatisticParticipants> = new Map();

	constructor(
		core: CoreGame,
		participants: IntrInfoParticipants[],
	) {
		this.core = core;

		participants.forEach(el => {
			this._statisticPlayer.set(el.id, {
				countHits: 0,
				countShots: 0
			});
		})
	}

	getStatisticPlayer(idParticipant: number | string): IntrStatisticParticipants | null {
		return this._statisticPlayer.get(String(idParticipant)) ?? null;
	}
}

export class Statistic extends Core {
	constructor(
		core: CoreGame,
		participants: IntrInfoParticipants[],
	) {
		super(core, participants);
	}

	update = (idParticipant: string | number, options: Partial<IntrStatisticParticipants>): void => {
		const stats = this.getStatisticPlayer(idParticipant);

		if (!stats) {
			throw new Error(`Статистика для игрока с id ${idParticipant} не найдена`);
		}

		const updatedStats: IntrStatisticParticipants = {
			countHits: options.countHits !== undefined ? stats.countHits + options.countHits : stats.countHits,
			countShots: options.countShots !== undefined ? stats.countShots + options.countShots : stats.countShots,
		};

		this._statisticPlayer.set(String(idParticipant), updatedStats);
	};
}