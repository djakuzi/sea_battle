import { IntrCoord, IntrCoordPuttingShip, IntrFullCoordPuttingShip, IntrFullDataShipBattle } from '../../../common/types/Ship.interface';
import { actionsBattle } from '../../../redux/slice/battle/battle.slice';
import store, { RootState } from '../../../redux/store';
import { EnumParticipant, EnumResultBattle, EnumStatusBattle } from '../types/battle.enum';
import { createMessageError, StandartError } from '../../../common/script/modules/error';
import { TypeCallback } from '../../../common/types/typeCallback.type';
import { IntrTimerBattle, IntrUpdatingCountRemainingShip } from '../type/Battle.interface';
import { createMessageWarn, StandartWarn } from '../../../common/script/modules/warn';
import { createOneNotificftion } from '../../../root-controller/Visual-Interface/elements/Notification/modules/notification';
import { CONFIG_FIELD } from '../../../core/settings/fieldCoord.settings';
import { CONFIG_BATTLE } from '../../../core/settings/battle.settings';
import { ModuleFieldBattle } from '@app-common/script/modules/FieldBattle/FieldBattle.module';

/**
 * @class - класс, отвечет за общие событие битвы.
 * -----
 * @constructor принимает следующие значения:
 * @param {HTMLDivElement} FieldCoordUser - поле, куда ставятся корабли;
 *
 * Свойства класса
 * -----
 * @property {string} nameClass - название класса;
 * @property {RootState} getState - получение состояние из redux;
 * @property {AppDispatch} dispatch - изменение состояния из redux;
 * @property {HTMLDivElement} FieldCoordUser - поле, куда ставятся корабли;
 * @property {HTMLDivElement} FieldCoordBot - поле, куда ставятся корабли;
 * @property {bollean} isError - наличие ошибки;
 * @property {object} objError - объект с названием ошибок;
 * @property {object} objWarn - объект с названием предупреждений;
 *
 * Доступные методы:
 * --
 * @method proccesHitToCoord - установить попадание по кораблю;
 * @method proccesMissToCoord - установить промох по кораблю;
 * @method showShip - показать корабль;
 * @method setTimer - установить/активировать таймер боя;
 * @method resetTimer - сбрасить таймер боя;
 * @method updateCountRemainingShip - обновить количество оставшихся кораблей;
 * @method shotAtParticipant - инициализация работы класса;
 * @method setFieldCoord - передаем поля игрока и противника
 */

export class Game {
	nameClass = 'Game';
	protected callbackEndTimer: TypeCallback | null = null;
	getState = (): RootState => store.getState();
	protected dispatch = store.dispatch;
	//таймер
	protected timerId;
	//стили
	protected style = CONFIG_FIELD.classesCoord;
	//enemy
	FieldCoordEnemy: HTMLDivElement | null = null;
	coordPuttingShipsEnemy: IntrCoordPuttingShip[] = [];
	coordFullPuttingShipsEnemy: IntrFullDataShipBattle[] = [];
	//player
	FieldCoordPlayer: HTMLDivElement | null = null;
	coordPuttingShipsPlayer: IntrCoordPuttingShip[] = [];
	coordFullPuttingShipsPlayer: IntrFullDataShipBattle[] = [];
	//error
	protected isError = false;
	protected objError = {
		changeErrorMessage: (message: string): string => {
			this.isError = message ? true : false;
			return createMessageError(this.nameClass, message);
		},
		notFoundFieldsInit: 'Fields of battle not found',
		notFoundField: 'Field of participant not found',
		notFoundCoordWithHit: 'Coord with hit',
	};
	protected objWarn = {
		createWarn: (message: string): string => createMessageWarn(this.nameClass, message),
		banToShotCoord: "You can't shoot at this coordinate",
	};

	constructor() { }

	/**
	 * @method updateTimer обновляет таймер боя
	 */
	updateTimer = (timer?: IntrTimerBattle): void => {
		const { oneNotification } = this.getState().notification;
		const { moveParticipant } = this.getState().battle.battle;
		const time = timer ? timer.time : this.getState().battle.battle.timer.time;
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;

		if (!oneNotification && moveParticipant == 'player' && time < CONFIG_BATTLE.timeMoveParticipant.fullTime / 2) {
			createOneNotificftion('notification', 'Ваш ход', false, 5000);
		}

		if (time <= 0) {
			this.resetTimer(this.callbackEndTimer);
		} else {
			this.dispatch(
				actionsBattle.updateTimer({
					time: time - 1,
					minutes: timer ? timer.minutes : `${minutes.toString().padStart(2, '0')}`,
					seconds: timer ? timer.seconds : `${seconds.toString().padStart(2, '0')}`,
				}),
			);
		}
	};
	/**
	 * @method setTimer начать отсчет боя
	 */
	setTimer(): void {
		if (this.timerId !== null) return; 

		this.timerId = setInterval(this.updateTimer, 1000);
	}
	/**
	 * @method stopTimer остановить таймер боя
	 */
	stopTimer(callback?: TypeCallback | null): void {
		clearInterval(this.timerId);
		this.timerId = null;
		
		if (callback) {
			callback();
		}
	}
	/**
	 * @method resetTimer сбросить таймер боя
	 */
	resetTimer(callback?: TypeCallback | null): void {
		clearInterval(this.timerId);
		this.timerId = null;

		this.dispatch(
			actionsBattle.updateTimer({
				time: CONFIG_BATTLE.timeMoveParticipant.fullTime,
				minutes: CONFIG_BATTLE.timeMoveParticipant.minute,
				seconds: CONFIG_BATTLE.timeMoveParticipant.seconds,
			}),
		);

		if (callback) {
			callback();
		}
	}
	/**
	 * @method getFieldCoord - получить поле игрока
	 */
	protected getFieldCoord = (
		typeParticipant: EnumParticipant = EnumParticipant.ENEMY
	): HTMLDivElement | null | undefined => {
		return typeParticipant == 'enemy' ? this.FieldCoordEnemy : this.FieldCoordPlayer;
	};
	/**
	 * @method getElementCoord - получить элемент координату
	 */
	protected getElementCoord = (
		coord: IntrCoord, 
		typeParticipant: EnumParticipant = EnumParticipant.ENEMY
	): HTMLDivElement | null | undefined => {
		const { x, y } = coord;
		let elCoord: HTMLDivElement | null | undefined;
		if (typeParticipant == 'player') {
			elCoord = this.FieldCoordPlayer?.querySelector(`[data-coord-x="${x}"][data-coord-y="${y}"]`);
		} else {
			elCoord = this.FieldCoordEnemy?.querySelector(`[data-coord-x="${x}"][data-coord-y="${y}"]`);
		}

		return elCoord;
	};
	/**
	 * @method proccesHitToCoord - установить попадание по кораблю;
	 */
	proccesHitToCoord = (
		coord: IntrCoord, 
		typeParticipant: EnumParticipant = EnumParticipant.ENEMY
	): void => {
		const fieldCoord = this.getFieldCoord(typeParticipant);
		
		if (fieldCoord) {
			ModuleFieldBattle.setHit(coord, fieldCoord);
		} else {
			const { notFoundField } = this.objError;
			this.setError(notFoundField);
		}
	};
	/**
	 * @method proccesMissToCoord - установить промох по кораблю;
	 */
	proccesMissToCoord = (
		coord: IntrCoord, 
		typeParticipant: EnumParticipant = EnumParticipant.ENEMY
	): void => {
		const fieldCoord = this.getFieldCoord(typeParticipant);

		if (fieldCoord) {
			ModuleFieldBattle.setMiss(coord, fieldCoord);
		} else {
			const { notFoundField } = this.objError;
			this.setError(notFoundField);
		}
	};
	/**
	 * @method proccesKillToCoord - уничтожить корабль
	 */
	proccesKillToCoord = (
		dataShip: IntrFullCoordPuttingShip, 
		typeParticipant: EnumParticipant = EnumParticipant.ENEMY
	): void => {
		const { plane } = dataShip.ship;
		const { coords } = dataShip;
		const fieldCoord = this.getFieldCoord(typeParticipant);

		if (fieldCoord) {
			ModuleFieldBattle.setPerimeter(plane, coords, fieldCoord);
			ModuleFieldBattle.setKill(coords, fieldCoord);
			ModuleFieldBattle.showShip(dataShip, fieldCoord);
		} else {
			const { notFoundField } = this.objError;
			this.setError(notFoundField);
		}
	};
	/**
	 * @method updateCountRemainingShip обновляем счет
	 * @param typePlayers - участник, которому нужно обновить счет
	 */
	protected updateCountRemainingShip = (
		typePlayers: EnumParticipant, 
		count?: number,
		isShowWinner: boolean = true,
	): void => {
		const currentCount = this.getState().battle[typePlayers].countRemainingShip;
		const obj: IntrUpdatingCountRemainingShip = {
			typePlayers: typePlayers,
			countRemainingShip: count ? count : currentCount - 1,
		};

		this.dispatch(actionsBattle.updateCountRemainingShip(obj));

		if (isShowWinner) {
			if (obj.countRemainingShip <= 0 && typePlayers == EnumParticipant.PLAYER) {
				this.setResultWinner(EnumResultBattle.ENEMY);
			}

			if (obj.countRemainingShip <= 0 && typePlayers == EnumParticipant.ENEMY) {
				this.setResultWinner(EnumResultBattle.PLAYER);
			}
		}
	};
	/**
	 * @method showAllShipPlayer показываем все корабли игрока
	 */
	protected showAllShipPlayer = (): void => {
		const fieldCoord = this.getFieldCoord(EnumParticipant.PLAYER);

		if (fieldCoord) {
			this.coordFullPuttingShipsPlayer.forEach((el) => {
				ModuleFieldBattle.showShip(el, fieldCoord);
			});
		} else {
			const { notFoundField } = this.objError;
			this.setError(notFoundField);
		}
	};
	/**
	 * @method setFieldCoord передаем поля игрока и противника
	 */
	setFieldCoord(FieldCoordPlayer: HTMLDivElement | null, FieldCoordEnemy: HTMLDivElement | null): void {
		const { notFoundFieldsInit } = this.objError;

		if (!FieldCoordPlayer || !FieldCoordEnemy) {
			this.setError(notFoundFieldsInit);
			return;
		}

		this.FieldCoordPlayer = FieldCoordPlayer;
		this.FieldCoordEnemy = FieldCoordEnemy;
	}
	/**
	 * @method changeStatusBattle устанавливаем cтатус битвы
	 */
	protected changeStatusBattle<R>(status: EnumStatusBattle, callback?: TypeCallback<R>): R | void {
		this.dispatch(actionsBattle.setStatusBattle(status));

		if (callback) {
			return callback();
		}
	}
	/**
	 * @method changeMoveParticipant изменяем ход
	 */
	changeMoveParticipant<R>(participant: EnumParticipant, callback?: TypeCallback<R>): R | void {
		this.dispatch(actionsBattle.setParticipantMove(participant));

		if (callback) {
			return callback();
		}
	}
	/**
	 * @method showWinner показываем победителя
	 */
	setResultWinner = (participantWinner: EnumResultBattle): void => {
		const { FieldCoordEnemy, coordFullPuttingShipsEnemy, dispatch } = this;

		this.stopTimer();

		dispatch(actionsBattle.setStatusBattle(EnumStatusBattle.FINISHED));

		if (FieldCoordEnemy) {
			coordFullPuttingShipsEnemy.forEach((el) => {
				ModuleFieldBattle.showShip(el, FieldCoordEnemy);
			});
		}

		setTimeout(() => {
			dispatch(actionsBattle.setResultBattle(participantWinner));
		}, 500);
	};
	/**
	 * @method isCountRemainingShip - есть ли у врага еще корабли
	 * true - есть
	 * false - нет
	 */
	
	isCountRemainingShip = (typePlayers: EnumParticipant): boolean => {
		const isZero = this.getState().battle[typePlayers].countRemainingShip > 0;
		return isZero;
	};
	/**
	 * @method setError устанавливаем ошибку
	 *
	 * **Примечание**
	 *  - Пустая строка '' - удаление ошибки.
	 */
	setError = (message: string): void => {
		const { changeErrorMessage } = this.objError;
		const messageResult = changeErrorMessage(message);

		new StandartError(messageResult, true).setError(() => {
			store.dispatch(actionsBattle.setError(messageResult));
		});
	};

	/**
	 * @method setWarn показываем предупреждение
	 */
	setWarn = (message: string): void => {
		const { createWarn } = this.objWarn;
		const messageResult = createWarn(message);

		new StandartWarn(messageResult).setWarn();
	};
}