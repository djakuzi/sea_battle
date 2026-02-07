import { WsOneVsOne } from "@app-network/ws/modules/BattleOneVsOne/OneVsOne.module";
import { EnumParticipant, EnumResultBattle, EnumStatusBattle, EnumStatusShot } from "../types/battle.enum";
import { Game } from "./game.core";
import { actionsBattle } from "@app-redux/slice/battle/battle.slice";
import { IntrDataShot, IntrInfoEnemy, IntrOnlineDataShot } from "../type/Battle.interface";
import { getPlayerId } from "@app-common/script/modules/Player/methods/getPlayerId";
import { isErrorWithConsole } from "@app-common/script/utils/error/method/isErrorWithConsole";
import { isNoCanShot } from "@app-common/script/modules/FieldBattle/methods/isShotedCoord";
import { IntrEventUpdateTime } from "@app-network/ws/modules/BattleOneVsOne/types/gameTime";
import { IntrEventWinner } from "@app-network/ws/modules/BattleOneVsOne/types/gameWinner.interface";
import { transformationToFullCoordShips } from "@app-common/script/modules/Ship/methods/transformationToFullCoordShips";
import { createNotificftionByList } from "@app-rootController/Visual-Interface/elements/Notification/modules/notification";

export interface IntrDataSub {
	isSubMyShot: boolean,
	isSubAtShotMe: boolean,
	isSubWaitedWinner: boolean
}

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
			case EnumStatusShot.HIT:
				this.core.proccesHitToCoord(coord, shotToParticipant);
				break;
			case EnumStatusShot.KILL:
				if (resultShot.dataShip) {
					this.core.proccesKillToCoord(resultShot.dataShip, shotToParticipant);
				}
				break;
			case EnumStatusShot.MISS:
				this.core.proccesMissToCoord(coord, shotToParticipant);
				break;
			default:
				this.core.setError(unknownResultShot);
		}
	}


	changeMoveParticipant = () => {
		const { moveParticipant } = this.core.getState().battle.battle;
		const nextMove = moveParticipant == EnumParticipant.PLAYER ? EnumParticipant.ENEMY : EnumParticipant.PLAYER;
		this.core.changeMoveParticipant(nextMove);

		this.core.timer.reset();
		this.core.timer.start();

		if (nextMove == EnumParticipant.PLAYER) {
			this.core.move.player()
		} else if (moveParticipant == EnumParticipant.ENEMY) {
			this.core.move.enemy();
		}
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
		try {
			const { target } = event;
			const coord = target.closest('[data-coord-x]');
			
			if (isNoCanShot(coord)) {
				throw new Error(this.core.objErrorGame.coordinateIsNotActive[EnumParticipant.ENEMY]);
			}

			if (coord.dataset.coordX && coord.dataset.coordY) {
				this.core.timer.stop();

				WsOneVsOne.services.procces.emitShotByEnemy({
					coord: {
						x: +coord.dataset.coordX,
						y: +coord.dataset.coordY
					}
				})

				this.core.FieldCoordEnemy?.removeEventListener('click', this.clickRectAtEnemy);
			}	
		} catch (error) {
			isErrorWithConsole(error);
		}
	};
}

class Timer {
	core: GameOneVsOne;

	constructor(core: GameOneVsOne) {
		this.core = core;
	}

	initTimer():void {
		this.onUpdateTime();
		this.onEndTime();
	}

	onUpdateTime = ():void => {
		WsOneVsOne.services.procces.onUpdateTime(
			{
				callback: this.updateTime
			}
		);
	}

	onEndTime = ():void => {
		WsOneVsOne.services.procces.onEndTime(
			{
				callback: this.core.common.changeMoveParticipant
			}
		);
	}

	updateTime = (event: IntrEventUpdateTime) => {
		const localTime = this.core.getState().battle.battle.timer.time;

		if (Math.abs(event.time - localTime) > 1) {
			this.core.updateTimer(event);
		}
	}

	start = () => {
		this.core.setTimer();
	}

	stop = () => {
		this.core.stopTimer();
	}

	reset = () => {
		this.core.resetTimer();
	}
}

class Move {
	core: GameOneVsOne;

	constructor(core: GameOneVsOne) {
		this.core = core;
	}

	player(resetTimer: boolean = true) {
		if (resetTimer) {
			this.core.timer.reset();
		}

		this.core.timer.start();

		if (!this.core.dataSub.isSubMyShot) {
			WsOneVsOne.services.procces.onMyShot({
				callback: (
					resultShot: IntrOnlineDataShot,
					moveParticipant: string,
				) => {
					this.core.checkShot(
						resultShot,
						moveParticipant,
						EnumParticipant.ENEMY
					)
				},
			});

			this.core.dataSub.isSubMyShot = true;
		}

		this.core.FieldCoordEnemy?.addEventListener('click', this.core.handler.clickRectAtEnemy);
	}

	enemy(resetTimer: boolean = true) {
		if (resetTimer) {
			this.core.timer.reset();
		}

		this.core.timer.start();

		if (!this.core.dataSub.isSubAtShotMe) {
			WsOneVsOne.services.procces.onShotAtMe({
				callback: (
					resultShot: IntrOnlineDataShot,
					moveParticipant: string,
				) => {
					this.core.checkShot(
						resultShot,
						moveParticipant,
						EnumParticipant.PLAYER
					)
				},
			});

			this.core.dataSub.isSubAtShotMe = true;
		}
	}
}

class Winner {
	core: GameOneVsOne;

	constructor(core: GameOneVsOne) {
		this.core = core;
	}

	init() {
		this.onWinner();
	}

	setWinner = (event: IntrEventWinner) => {
		const winner = getPlayerId() == event.idWinner ? EnumResultBattle.PLAYER : EnumResultBattle.ENEMY;
		this.core.coordFullPuttingShipsEnemy = event.shipsEnemy;
		this.core.setResultWinner(winner);
	}

	private onWinner = () => {
		if (!this.core.dataSub.isSubWaitedWinner) {
			WsOneVsOne.services.procces.onceWinner({
				callback: this.setWinner
			});

			this.core.dataSub.isSubWaitedWinner = true;
		}
	}
}

export class GameOneVsOne extends Game {
	nameClass = 'GameOneVsOne';
	handler: Handler = new Handler(this);
	common: Common = new Common(this);
	move: Move = new Move(this);
	timer: Timer = new Timer(this);
	winner: Winner = new Winner(this);

	dataSub: IntrDataSub = {
		isSubMyShot: false,
		isSubAtShotMe: false,
		isSubWaitedWinner: false,
	}

	objErrorGame = {
		notFoundCoordsParticipants: 'Сoords participants not found',
		notFoundShotToCoord: 'Shot to coord  not found',
		unknownResultShot: 'Result of the shot is unknown',
		coordinateIsNotActive: {
			[EnumParticipant.ENEMY]: 'This coordinate is not active for firing.',
			[EnumParticipant.PLAYER]: 'The player shot at an inactive coordinate.'
		}
	};

	constructor() {
		super();

		this.onLeaveEnemy();
	}

	init() {
		this.dispatch(actionsBattle.setDataEnemy(WsOneVsOne.data.enemy as IntrInfoEnemy));

		this.updateCountRemainingShip(EnumParticipant.PLAYER, 10, false);
		this.updateCountRemainingShip(EnumParticipant.ENEMY, 10, false);

		this.changeMoveParticipant(getPlayerId() == WsOneVsOne.data.firstMove ? EnumParticipant.PLAYER : EnumParticipant.ENEMY);
		
		this.initParams();
		this.showAllShipPlayer();
		this.startGame();
	}

	leaveGame = ():void => {
		this.timer.reset();
		this.dispatch(actionsBattle.clearDataBattle());
		WsOneVsOne.disconnect();
	}

	onLeaveEnemy = ():void => {
		WsOneVsOne.services.procces.onEnemyLeft(
			{
				callback: () => {
					this.timer.reset();
					this.dispatch(actionsBattle.clearDataBattle());
					this.dispatch(actionsBattle.setStatusBattle(EnumStatusBattle.LEAVE_ENEMY));
					WsOneVsOne.disconnect();
				}
			}
		);
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
		this.timer.initTimer();
		this.timer.start();
		this.winner.init();
		this.activateMoveParticipant();
	}
	
	private activateMoveParticipant() {
		const { moveParticipant } = this.getState().battle.battle;

		if (moveParticipant == EnumParticipant.PLAYER) {
			this.move.player()
		} else if (moveParticipant == EnumParticipant.ENEMY) {
			this.move.enemy();
		}
	}

	checkShot = (
		resultShot: IntrOnlineDataShot,
		moveParticipant: string,
		typeParticipant: EnumParticipant,
	) => {
		try {
			const { id: idEnemy } = this.getState().battle.enemy;
			const nextMove = moveParticipant != idEnemy ? EnumParticipant.PLAYER : EnumParticipant.ENEMY;

			if (resultShot.isShotedCoord) {
				this.timer.stop();

				this.move.player(false);
				this.move.enemy(false);

				throw new Error(this.objErrorGame.coordinateIsNotActive[typeParticipant]);
			}

			if (typeParticipant === EnumParticipant.PLAYER) {
				this.timer.stop();
			}

			this.common.checkResultShot(resultShot, typeParticipant);

			if (resultShot.status == 'kill') {
				this.updateCountRemainingShip(typeParticipant, undefined, false);

				const isCountShipEnemy = this.isCountRemainingShip(typeParticipant);

				if (!isCountShipEnemy) {
					return;
				}
			}

			this.changeMoveParticipant(nextMove);

			this.activateMoveParticipant();	
		} catch (error) {
			isErrorWithConsole(error);
		}
	}

}