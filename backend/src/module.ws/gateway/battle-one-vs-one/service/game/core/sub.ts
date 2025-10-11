import { IntrShipCoord } from "src/common/types/ship/ship.interface";
import { getSession } from "../../../../../../common/util/session/methods/getSession";
import { ServiceGame } from "../game.service";
import { EnumStatusGame } from "src/game/core/types/game.enum";
import { getEnemyParticipant } from "../../../script/util/session/methods/getEnemyParticipant";

export class Sub {
	private core: ServiceGame;

	constructor(core: ServiceGame) {
		this.core = core;
	}

	async shotByParticipant(
		playerId: string,
		idSession: string,
		coord: IntrShipCoord
	): Promise<void> {
		const session = getSession(this.core.serviceGameSessions.gameSessions, idSession);
		const enemy = getEnemyParticipant(session.session, playerId);

		if (!session?.game) {
			throw new Error('Произошла ошибка. Игра не найдена');
		}

		const resultShot = session.game.shotToCoord(
			enemy.data.id,
			coord,
		);

		this.core.emit.myShot(
			session.session.participants[playerId].client,
			resultShot,
		)

		this.core.emit.shotAtMe(
			enemy.client,
			resultShot,
		)

		if (session.game.Status.isStatus(EnumStatusGame.FINISHED)) {
			const idWinner = session.game.Procces.winnerParticipant;

			if (session.session.participants[String(idWinner)] && idWinner) {

				for (const key in session.session.participants) {

					this.core.emit.winner(
						session.session.participants[key].client,
						idWinner,
					)
				}

				this.core.finishGame(idSession, idWinner);
			} else {
				throw new Error('Произошла ошибка при определении победителя');
			}
		}
	}
};