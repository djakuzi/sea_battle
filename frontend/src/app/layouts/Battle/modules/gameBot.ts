import { transformationToFullCoordShips } from '@app-common/script/modules/ship.module';
import { EnumParticipant, EnumStatusBattle, EnumStatusShot } from '../types/battle.enum';
import { Game } from './game.core';
import { BotBattle } from './bot';
import {
	IntrCoord,
	IntrFullCoordPuttingShip,
	IntrFullDataShipBattle,
} from '@app-common/types/Ship.interface';
import { IntrDataShot } from '../type/Battle.interface';
import { actionsBattle } from '../../../redux/slice/battle/battle.slice';
import { standartSetTimeout } from '@app-common/script/modules/TimeOut/methods/standartSetTimeout';

/**
 * @class @extends Battle - отвечет за битву с ботом.
 * -----
 * @constructor принимает следующие значения:
 *
 * Свойства класса
 * -----
 * @property {IntrCoordPuttingShip[]} coordPuttingShipsEnemy - массив координат кораблей противника;
 * @property {IntrCoordPuttingShip[]} coordPuttingShipsPlayer - массив координат кораблей игрока;
 *
 * Доступные методы:
 * @method init - инициализация битвы
 * @method unInit - удаление битвы
 */
export class GameBot extends Game {
	nameClass = 'GameBot';

	private bot: BotBattle;

	private privateMthds;

	private objErrorBattleBot = {
		notFoundCoordsParticipants: 'Сoords participants not found',
		notFoundShotToCoord: 'Shot to coord  not found',
		unknownResultShot: 'Result of the shot is unknown',
	};

	private objErrorBattleWarn = {
		notFoundCoordsParticipants: 'Сoords participants not found',
		notFoundShotToCoord: 'Shot to coord  not found',
		unknownResultShot: 'Result of the shot is unknown',
	};

	constructor(bot: BotBattle) {
		super();
		this.bot = bot;
		this.updateCountRemainingShip(EnumParticipant.PLAYER, 10);
	}
	/**
	 * @method setFirstMove - определяем кто первый ходит
	 */
	setFirstMove(): void {
		const firstMove: EnumParticipant = Math.random() > 0.5 ? EnumParticipant.PLAYER : EnumParticipant.ENEMY;
		this.dispatch(actionsBattle.setParticipantMove(firstMove));
	}
	/**
	 * @method init - инициализация игры
	 */
	init(): void {
		this.initPrivateGeneralMthds();
		this.initCallbackTimerEnd();
		this.initParams();
		this.showAllShipPlayer();
		this.startGame();
	}

	/**
	 * @method unInit - удаление игры
	 */
	unInit(): void {
		this.resetTimer();
		this.FieldCoordEnemy?.removeEventListener('click', this.handlerClickRect);
	}

	private initCallbackTimerEnd = (): void => {
		this.callbackEndTimer = (): void => {
			const { moveParticipant } = this.getState().battle.battle;
			const nextMove: EnumParticipant = moveParticipant == EnumParticipant.ENEMY ? EnumParticipant.PLAYER : EnumParticipant.ENEMY;

			this.dispatch(actionsBattle.setParticipantMove(nextMove));
			this.activateMoveParticipant();
		};
	};

	/**
	 * @method initParams - создание параметров
	 */
	private initParams = (): void => {
		const { coordPuttingShips: coordPuttingShipsEnemy } = this.getState().battle.enemy;
		const { coordPuttingShips: coordPuttingShipsPlayer } = this.getState().battle.player;

		if (coordPuttingShipsEnemy && coordPuttingShipsPlayer) {
			this.coordPuttingShipsEnemy = coordPuttingShipsEnemy;
			this.coordPuttingShipsPlayer = coordPuttingShipsPlayer;

			this.coordFullPuttingShipsEnemy =
				transformationToFullCoordShips(coordPuttingShipsEnemy);
			this.coordFullPuttingShipsPlayer =
				transformationToFullCoordShips(coordPuttingShipsPlayer);
		} else {
			const { notFoundCoordsParticipants } = this.objErrorBattleBot;
			this.setError(notFoundCoordsParticipants);
		}
	};
	/**
	 * @method initPrivateGeneralMthds - инициализировать общие приватные методы
	 */
	private initPrivateGeneralMthds = (): void => {
		/**
		 * @method checkShotToCoord - проверить выстрел по координате
		 */
		function checkShotToCoord(
			coordsShot: IntrCoord,
			coordFullPuttingShips: IntrFullDataShipBattle[]
		): IntrDataShot {
			const objResult: IntrDataShot = {
				status: EnumStatusShot.MISS,
				coord: coordsShot,
				dataShip: false,
			};

			const { x: xShot, y: yShot } = coordsShot;

			for (const dataShip of coordFullPuttingShips) {
				const { size: sizeShip } = dataShip.ship;

				if (dataShip.isKill) continue;

				for (const coord of dataShip.coords) {
					if (coord.x === xShot && coord.y === yShot) {
						const objDataShip: IntrFullCoordPuttingShip = {
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

			return objResult;
		}
		/**
		 * @method checkResultShot - метод для проверки результата выстрела
		 */
		const checkResultShot = (
			resultShot: IntrDataShot,
			shotToParticipant: EnumParticipant
		): void => {
			const { unknownResultShot } = this.objErrorBattleBot;
			const { status, coord } = resultShot;

			switch (status) {
				case 'hit':
					this.proccesHitToCoord(coord, shotToParticipant);
					break;
				case 'kill':
					if (resultShot.dataShip) {
						this.proccesKillToCoord(resultShot.dataShip, shotToParticipant);
					}
					break;
				case 'miss':
					this.proccesMissToCoord(coord, shotToParticipant);
					break;
				default:
					this.setError(unknownResultShot);
			}
		};
		/**
		 * @method resetMoveParticipant - сброс хода
		 * Если есть @param {TypeParticipant} changeMoveParticipant, то ход
		 * переходит этому типу игрока.
		 */
		const resetMoveParticipant = (changeMoveParticipant: EnumParticipant): void => {
			this.resetTimer();

			if (changeMoveParticipant) {
				this.dispatch(actionsBattle.setParticipantMove(changeMoveParticipant));
				this.activateMoveParticipant();
			}
		};
		/**
		 * @method isCountRemainingShip - есть ли у врага еще корабли
		 * true - есть
		 * false - нет
		 */
		const isCountRemainingShip = (typePlayers: EnumParticipant): boolean => {
			const isZero = this.getState().battle[typePlayers].countRemainingShip > 0;
			return isZero;
		};

		this.privateMthds = {
			checkShotToCoord,
			checkResultShot,
			resetMoveParticipant,
			isCountRemainingShip,
		};
	};

	/**
	 * @method startGame - начало игры
	 */
	private startGame = (): void => {
		this.changeStatusBattle(EnumStatusBattle.GAME);
		this.activateMoveParticipant();
	};

	/**
	 * @method activateMoveParticipant - активация хода участника
	 */
	private activateMoveParticipant = (): void => {
		try {
			const { moveParticipant } = this.getState().battle.battle;

			if (moveParticipant == EnumParticipant.PLAYER) {
				this.MovePlayer();
			} else if (moveParticipant == EnumParticipant.ENEMY) {
				this.setTimer();
				standartSetTimeout(1000, this.MoveBot);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				this.setError(error.message);
			} else {
				this.setError('Неизвестная ошибка');
			}
		}
	};

	/**
	 * @method MoveBot ход бота
	 */
	private MoveBot = (lastHit?: IntrCoord): void => {
		let isCountShipEnemy: boolean = true;

		const selectCoord = this.bot.getSelectCoordToBot();
		const resultShot: IntrDataShot = this.privateMthds.checkShotToCoord(
			selectCoord,
			this.coordFullPuttingShipsPlayer
		);
		const coords = resultShot.dataShip ? resultShot.dataShip.coords : undefined;
		const { status } = resultShot;

		this.privateMthds.checkResultShot(resultShot, EnumParticipant.PLAYER);
		this.bot.updateShotResult(selectCoord, status, coords);

		if (status == 'hit') {
			this.privateMthds.resetMoveParticipant();

			standartSetTimeout(1000, () => this.MoveBot(selectCoord));
		}

		if (status == 'kill' && resultShot.dataShip) {
			this.updateCountRemainingShip(EnumParticipant.PLAYER);
			this.privateMthds.resetMoveParticipant();
			isCountShipEnemy = this.privateMthds.isCountRemainingShip(EnumParticipant.PLAYER);

			if (isCountShipEnemy) standartSetTimeout(1000, this.MoveBot);
		}

		if (!isCountShipEnemy) {
			this.privateMthds.resetMoveParticipant();
			return;
		}

		if (status == 'miss') {
			this.privateMthds.resetMoveParticipant(EnumParticipant.PLAYER);
		}
	};
	/**
	 * @method MoveBot ход игрока
	 */
	private MovePlayer = (): void => {
		this.setTimer();
		this.FieldCoordEnemy?.addEventListener('click', this.handlerClickRect);
	};
	/**
	 * @method handlerClickRect обработчик-клик события поля соперника
	 */
	private handlerClickRect = (event): void => {
		const { target } = event;
		const coord = target.closest('[data-coord-x]');

		if (coord) {
			this.shotToEnemy(coord);
		}
	};
	/**
	 * @method shotToEnemy выстрел от игрока
	 */
	private shotToEnemy = (coord: HTMLDivElement): void => {
		try {
			const { coordX, coordY } = coord.dataset;
			const { notFoundShotToCoord } = this.objErrorBattleBot;
			const isClass = this.checkClassCoord(coord);
			let isCountShipEnemy: boolean = true;

			if (!coordX || !coordY) {
				this.setError(notFoundShotToCoord);
				return;
			}

			if (isClass) {
				const { banToShotCoord } = this.objWarn;
				this.setWarn(banToShotCoord);
				return;
			}

			const objCoord = {
				x: +coordX,
				y: +coordY,
			};

			const resultShot: IntrDataShot = this.privateMthds.checkShotToCoord(
				objCoord,
				this.coordFullPuttingShipsEnemy
			);
			this.privateMthds.checkResultShot(resultShot, EnumParticipant.ENEMY);

			if (resultShot.status == 'kill') {
				this.updateCountRemainingShip(EnumParticipant.ENEMY);
				isCountShipEnemy = this.privateMthds.isCountRemainingShip(EnumParticipant.ENEMY);
			}

			if (!isCountShipEnemy) {
				this.privateMthds.resetMoveParticipant();
				this.FieldCoordEnemy?.removeEventListener('click', this.handlerClickRect);
			}

			if (resultShot.status == 'miss') {
				this.privateMthds.resetMoveParticipant(EnumParticipant.ENEMY);
				this.FieldCoordEnemy?.removeEventListener('click', this.handlerClickRect);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				this.setError(error.message);
			} else {
				this.setError('Неизвестная ошибка');
			}

			this.privateMthds.resetMoveParticipant(EnumParticipant.ENEMY);
			this.FieldCoordEnemy?.removeEventListener('click', this.handlerClickRect);
		}
	};
}
