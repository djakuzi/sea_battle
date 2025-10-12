import { WsOneVsOne } from "@app-network/ws/modules/BattleOneVsOne/OneVsOne.module";
import { EnumParticipant, EnumStatusShot } from "../types/battle.enum";
import { Game } from "./game.core";
import { actionsBattle } from "@app-redux/slice/battle/battle.slice";
import { IntrDataShot, IntrInfoEnemy } from "../type/Battle.interface";
import { getPlayerId } from "@app-common/script/modules/Player/methods/getPlayerId";
import { transformationToFullCoordShips } from "@app-common/script/modules/ship.module";

class Common {
	core: GameOneVsOne;

	constructor(core: GameOneVsOne) {
		this.core = core;
	}

	checkResultShot = (
		resultShot: IntrDataShot,
		shotToParticipant: EnumParticipant
	): void => {
		const { unknownResultShot } = this.core.objErrorGame;
		const { status, coord } = resultShot;

		switch (status) {
			case 'hit':
				this.core.proccesHitToCoord(coord, shotToParticipant);
				break;
			case 'kill':
				if (resultShot.dataShip) {
					this.core.proccesKillToCoord(resultShot.dataShip, shotToParticipant);
				}
				break;
			case 'miss':
				this.core.proccesMissToCoord(coord, shotToParticipant);
				break;
			default:
				this.core.setError(unknownResultShot);
		}
	}

	checkMyShot = (
		resultShot: IntrDataShot,
		moveParticipant: string,
	) => {
		this.checkResultShot(resultShot, EnumParticipant.ENEMY);
	}
}

class Handler {
	core: GameOneVsOne;

	constructor(core: GameOneVsOne) {
		this.core = core;
	}

	/**
	 * @method clickRectAtEnemy обработчик-клик события поля соперника
	 */
	clickRectAtEnemy = (event): void => {
		const { target } = event;
		const coord = target.closest('[data-coord-x]');

		if (coord) {
			this.core.stopTimer();
			WsOneVsOne.services.procces.emitShotByEnemy({
				coord: coord
			})

			this.core.FieldCoordEnemy?.removeEventListener('click', this.clickRectAtEnemy);
		}
	};
}

export class GameOneVsOne extends Game {
	private handler: Handler = new Handler(this);
	private common: Common = new Common(this);

	objErrorGame = {
		notFoundCoordsParticipants: 'Сoords participants not found',
		notFoundShotToCoord: 'Shot to coord  not found',
		unknownResultShot: 'Result of the shot is unknown',
	};

	constructor() {
		super();
	}

	init() {
		this.dispatch(actionsBattle.setDataEnemy(WsOneVsOne.data.enemy as IntrInfoEnemy));

		this.updateCountRemainingShip(EnumParticipant.PLAYER, 10);
		this.updateCountRemainingShip(EnumParticipant.ENEMY, 10);

		this.changeMoveParticipant(getPlayerId() == WsOneVsOne.data.firstMove ? EnumParticipant.PLAYER : EnumParticipant.ENEMY);
		
		this.initParams();
		this.showAllShipPlayer();
		this.startGame();
	}

	private initParams() {
		const { coordPuttingShips: coordPuttingShipsPlayer } = this.getState().battle.player;

		if (coordPuttingShipsPlayer) {
			this.coordPuttingShipsPlayer = coordPuttingShipsPlayer;

			this.coordFullPuttingShipsPlayer =
				transformationToFullCoordShips(coordPuttingShipsPlayer);
		} else {
			const { notFoundCoordsParticipants } = this.objErrorGame;
			this.setError(notFoundCoordsParticipants);
		}
	}

	private startGame() {
		this.activateMoveParticipant()
	}
	
	private activateMoveParticipant() {
		const { moveParticipant } = this.getState().battle.battle;

		if (moveParticipant == EnumParticipant.PLAYER) {
			this.movePlayer();
		} else if (moveParticipant == EnumParticipant.ENEMY) {
			this.moveEnemy();
		}

		this.waitShot();
		this.waitWinner();
	}

	private movePlayer() {
		this.setTimer();
		this.FieldCoordEnemy?.addEventListener('click', this.handler.clickRectAtEnemy);

		WsOneVsOne.services.procces.onMyShot({
			callback: this.common.checkMyShot,
		});
	}

	private moveEnemy() {
		this.setTimer();
	}

	private waitShot() {
		WsOneVsOne.services.procces.onShotAtMe({
			callback: (
				resultShot: IntrDataShot,
			) => this.common.checkResultShot(resultShot, EnumParticipant.PLAYER),
		});
	}

	private waitWinner() {
		WsOneVsOne.services.procces.onWinner({
			callback: this.common.checkMyShot
		});
	}
}