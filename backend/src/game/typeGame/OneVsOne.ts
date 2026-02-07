import { IntrFullInfoShip, IntrShipCoord } from "src/common/types/ship/ship.interface";
import { CoreGame } from "../core/coreGame"
import { IntrInfoParticipants } from "../core/types/gameParticipants.interface";
import { EnumStatusGame, EnumStatusShot } from "../core/types/game.enum";
import { IntrResultDataShot } from "../core/types/gameShot.interface";
import { IntrConfig } from "../core/types/config/config.interface";

export class GameOneVsOne extends CoreGame {
	constructor(
		participants: IntrInfoParticipants[],
		fieldCoordShips: Record<string, IntrFullInfoShip[]>,
		config?: Partial<IntrConfig>
	) {
		super(
			participants,
			fieldCoordShips,
			config
		);
	}

	startGame() {
		this.Status.start();
		this.Timer.setTimer();

		this.Timer.listenner.onEnd(() => this.Timer.setTimer());
	}

	shotToCoord(
		idPlayer: string,
		idEnemy: string,
		coordsShot: IntrShipCoord,
	): IntrResultDataShot & { nextMove: string } {
		if (!this.Status.isStatus(EnumStatusGame.GAME)) {
			throw new Error('Игра на паузе');
		}

		if (!this.Move.isPlayerTurn(idPlayer)) {
			throw new Error('Не ваш ход!');
		}

		const resultShot = this.Procces.shotToCoord(coordsShot, idEnemy, idPlayer);
		let nextMove: string = '';

		if (resultShot.isShotedCoord) {
			nextMove = idPlayer;
		} else {
			nextMove = resultShot.status !== EnumStatusShot.MISS ? idPlayer : idEnemy;
		}

		this.Move.switchTurn(nextMove);

		return {
			...resultShot,
			nextMove: nextMove
		}
	}
}