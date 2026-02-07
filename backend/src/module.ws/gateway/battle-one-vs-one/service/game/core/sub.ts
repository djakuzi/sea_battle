import { IntrShipCoord } from "src/common/types/ship/ship.interface";
import { getSession } from "../../../../../../common/util/session/methods/getSession";
import { ServiceGame } from "../game.service";
import { EnumStatusGame } from "src/game/core/types/game.enum";
import { getEnemyParticipant } from "../../../script/util/session/methods/getEnemyParticipant";
import { IntrResultDataShot } from "src/game/core/types/gameShot.interface";
import { IntrWinner } from "../../../types/game/winner.interface";

export class Sub {
	private core: ServiceGame;

	constructor(core: ServiceGame) {
		this.core = core;
	}

	async shotByParticipant(
		idPlayer: string,
		idSession: string,
		coord: IntrShipCoord
	): Promise<void> {
		const session = getSession(this.core.serviceGameSessions.gameSessions, idSession);
		const enemy = getEnemyParticipant(session.session, idPlayer);

		if (!session?.game) {
			throw new Error('Произошла ошибка. Игра не найдена');
		}

		session.game.Timer.stopTimer();

		const resultShot = session.game.shotToCoord(
			idPlayer,
			enemy.data.id,
			coord,
		);
		
		const dataShot: IntrResultDataShot = {
			status: resultShot.status,
			coord: resultShot.coord,
			dataShip: resultShot.dataShip,
			isShotedCoord: resultShot.isShotedCoord
		}

		this.core.emit.myShot(
			session.session.participants[idPlayer].client,
			dataShot,
			resultShot.nextMove,
		)

		this.core.emit.shotAtMe(
			enemy.client,
			dataShot,
			resultShot.nextMove,
		)

		if (session.game.Status.isStatus(EnumStatusGame.FINISHED)) {
			const idWinner = session.game.Procces.winnerParticipant;

			if (session.session.participants[String(idWinner)] && idWinner) {

				for (const key in session.session.participants) {
					const data: IntrWinner = {
						idWinner: idWinner,
						shipsEnemy: session.game.Procces.getEnemyDataShip(enemy.data.id),
					}

					this.core.emit.winner(
						session.session.participants[key].client,
						data
					)
				}

				this.core.finishGame(session, idWinner);
			} else {
				throw new Error('Произошла ошибка при определении победителя');
			}
		} else {
			session.game.Timer.updateDataTimer();
			session.game.Timer.setTimer();
		}
	}
};