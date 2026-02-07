import { IntrFullInfoShip, IntrShipCoord } from "src/common/types/ship/ship.interface";
import { IntrDataShipGame } from "../types/gameShip.interface";
import { IntrDataShot, IntrResultDataShot } from "../types/gameShot.interface";
import { CoreGame } from "../coreGame";
import { EnumStatusShot } from "../types/game.enum";
import { IntrStatisticParticipants } from "../types/statistic/statisticParticipants.interface";

export class Core {
	protected core: CoreGame;

	winnerParticipant: string | null;

	fieldCoordShips: Map<string, IntrDataShipGame[]> = new Map();
	fullFieldCoord: Map<string, (string | number)[][]> = new Map();
	countRemainingShips: Map<string, number> = new Map();

	constructor(
		core: CoreGame,
		fieldCoordShips: Record<string, IntrFullInfoShip[]>,
	) {
		this.core = core;

		for (const key in fieldCoordShips) {
			const modify = fieldCoordShips[key].map(el => {
				return {
					countHit: 0,
					isKill: false,
					...el
				};
			})

			this.fieldCoordShips.set(key, modify);
			this.fullFieldCoord.set(key, Array(10).fill(null).map(() => Array(10).fill('') as (string | number)[]));
			this.countRemainingShips.set(key, 10);
		}
	}

	protected isShotedCoord(
		coord: IntrShipCoord,
		idParticipants: string,
	) {
		const field = this.fullFieldCoord.get(idParticipants);

		if (!field) {
			throw new Error('Не найдено поле противника');
		}

		const typeCoord = field[coord.x][coord.y];

		return typeCoord ? true : false;
	}

	protected updateFullFieldCoord(
		coord: IntrShipCoord,
		type: 'miss' | 'hit',
		idParticipants: string,
	) {
		const field = this.fullFieldCoord.get(idParticipants);

		if (!field) {
			throw new Error('Не найдено поле противника');
		}

		field[coord.x][coord.y] = type;

		this.fullFieldCoord.set(idParticipants, field);
	}

	protected updateRemainingShips(idParticipants: string, isDecrease: boolean) {
		if (isDecrease) {
			const count = this.countRemainingShips.get(idParticipants);

			if (!count) {
				throw new Error('Не определено число оставшихся кораблей');
			}

			if (count > 0) {
				this.countRemainingShips.set(idParticipants, count - 1);
			}
		}
	}

	protected checkShotToCoord(
		coordsShot: IntrShipCoord,
		dataShipGame: IntrDataShipGame[]
	): IntrDataShot {
		const objResult: IntrDataShot = {
			status: EnumStatusShot.MISS,
			coord: coordsShot,
			dataShip: false,
		};

		const { x: xShot, y: yShot } = coordsShot;

		for (const dataShip of dataShipGame) {
			const { size: sizeShip } = dataShip.ship;

			if (dataShip.isKill) continue;

			for (const coord of dataShip.coords) {
				if (coord.x === xShot && coord.y === yShot) {
					const objDataShip: IntrFullInfoShip = {
						ship: dataShip.ship,
						coords: dataShip.coords,
					};

					let { countHit } = dataShip;
					countHit += 1;

					const statusHit = sizeShip == countHit ? EnumStatusShot.KILL : EnumStatusShot.HIT;
					dataShip.countHit = countHit;
					dataShip.isKill = statusHit == EnumStatusShot.KILL;

					objResult.status = statusHit;
					objResult.dataShip = dataShip.isKill ? objDataShip : false;

					return objResult;
				}
			}
		}

		return objResult
	}

	getDataShip(idParticipants: string): IntrDataShipGame[] {
		const res = this.fieldCoordShips.get(idParticipants);
		if (!res) {
			throw new Error('Не найдены данные о кораблях битвы игрока с id: ' + idParticipants);
		}

		return res;
	}

	getEnemyDataShip(currentPlayerId: string): IntrDataShipGame[] {
		for (const [id, ships] of this.fieldCoordShips.entries()) {
			if (id !== currentPlayerId) {
				return ships;
			}
		}

		throw new Error('Данные о кораблях противника не найдены');
	}
}

export class Procces extends Core {
	constructor(
		core: CoreGame,
		fieldCoordShips: Record<string, IntrFullInfoShip[]>,
	) {
		super(core, fieldCoordShips);
	}

	private checkWinner(): string | null{
		let winner: string | null = null;

		this.countRemainingShips.forEach((count, participantId) => {
			if (count <= 0) {
				winner = [...this.countRemainingShips.keys()].find(id => id !== participantId) || null;
			}
		});

		if (winner) {
			this.winnerParticipant = winner;
			this.core.Status.finished();
		}

		return winner;
	}

	shotToCoord(
		coordsShot: IntrShipCoord,
		idEnemyParticipants: string,
		idCurrentParticipants: string
	): IntrResultDataShot {
		const dataShipGame = this.fieldCoordShips.get(idEnemyParticipants);

		if (this.isShotedCoord(coordsShot, idEnemyParticipants)) {
			return {
				isShotedCoord: true
			}
		}

		if (!dataShipGame) {
			throw new Error('Координаты не найдены');
		}

		const objResult = this.checkShotToCoord(
			coordsShot,
			dataShipGame
		);

		this.updateFullFieldCoord(
			objResult.coord,
			objResult.status == EnumStatusShot.MISS ? EnumStatusShot.MISS : EnumStatusShot.HIT,
			idEnemyParticipants
		)

		this.updateRemainingShips(
			idEnemyParticipants,
			objResult.status == EnumStatusShot.KILL,
		)

		if (this.core.Config.getOptionsConfig('isKeepStatistics')) {
			const data:Partial<IntrStatisticParticipants> = {
				countShots: 1,
				countHits: objResult.status === EnumStatusShot.MISS ? undefined : 1,
			}

			this.core.Statistic.update(idCurrentParticipants, data);
		}

		this.checkWinner();

		return objResult;
	}
}