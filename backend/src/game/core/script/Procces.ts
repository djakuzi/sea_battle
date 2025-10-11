import { IntrFullInfoShip, IntrShipCoord } from "src/common/types/ship/ship.interface";
import { IntrDataShipGame } from "../types/gameShip.interface";
import { IntrDataShot } from "../types/gameShot.interface";
import { CoreGame } from "../coreGame";
import { EnumStatusShot } from "../types/game.enum";

export class Procces {
	private core: CoreGame;

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

	private checkWinner(): string | null{
		let winner: string | null = null;

		this.countRemainingShips.forEach((count, participantId) => {
			if (count <= 0) {
				winner = [...this.countRemainingShips.keys()].find(id => id !== participantId) || null;
			}
		});

		this.winnerParticipant = winner;

		this.core.Status.finished();
		return winner;
	}

	private isShotedCoord(
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

	private updateFullFieldCoord(
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

	private updateRemainingShips(idParticipants: string, isDecrease: boolean) {
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

	private checkShotToCoord(
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

	shotToCoord(
		coordsShot: IntrShipCoord,
		idParticipants: string,
	): IntrDataShot {
		const dataShipGame = this.fieldCoordShips.get(idParticipants);

		if (this.isShotedCoord(coordsShot, idParticipants)) {
			throw new Error('По этим координатам уже был воспроизведен выстрел');
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
			idParticipants
		)

		this.updateRemainingShips(
			idParticipants,
			objResult.status == EnumStatusShot.KILL,
		)

		this.checkWinner();

		return objResult;
	}
}