import { IntrCoord, IntrCoordPuttingShip, IntrFullCoordPuttingShip, IntrFullDataShipBattle } from '../../../common/types/Ship.interface';
import { actionsBattle } from '../../../redux/slice/battle.slice';
import store, { RootState } from '../../../redux/store';
import { TypeParticipant, TypeStatusBattle } from '../types/battle';
import { createMessageError, StandartError } from '../../../common/script/modules/error';
import { TypeCallback } from '../../../common/types/typeCallback.type';
import { transformationToFullCoordShips } from '../../../common/script/modules/ship.module';
import { BotBattle } from './bot';
import { IntrDataShot, IntrUpdatingCountRemainingShip } from '../type/Battle.interface';
import { createMessageWarn, StandartWarn } from '../../../common/script/modules/warn';
import { mthdsCoords } from '../../../common/script/modules/fieldCoord.module';
import { createOneNotificftion } from '../../../root-controller/Visual-Interface/elements/Notification/modules/notification';
import { CONFIG_FIELD } from '../../../core/settings/fieldCoord.settings';
import { CONFIG_BATTLE } from '../../../core/settings/battle.settings';
import { standartSetTimeout } from '../../../common/script/modules/TimeOut/methods/standartSetTimeout';

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

export class Battle {
  nameClass = 'Battle';
  protected callbackEndTimer: TypeCallback | null = null;
  protected getState = (): RootState => store.getState();
  protected dispatch = store.dispatch;
  //таймер
  protected timerId;
  //стили
  protected style = CONFIG_FIELD.classesCoord;
  //enemy
  protected FieldCoordEnemy: HTMLDivElement | null = null;
  protected coordPuttingShipsEnemy: IntrCoordPuttingShip[] = [];
  protected coordFullPuttingShipsEnemy: IntrFullDataShipBattle[] = [];
  //player
  protected FieldCoordPlayer: HTMLDivElement | null = null;
  protected coordPuttingShipsPlayer: IntrCoordPuttingShip[] = [];
  protected coordFullPuttingShipsPlayer: IntrFullDataShipBattle[] = [];
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
  protected updateTimer = (): void => {
    const { oneNotification } = this.getState().notification;
    const { moveParticipant } = this.getState().battle.battle;
    const { time } = this.getState().battle.battle.timer;
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
          minutes: `${minutes.toString().padStart(2, '0')}`,
          seconds: `${seconds.toString().padStart(2, '0')}`,
        }),
      );
    }
  };
  /**
   * @method setTimer начать отсчет боя
   */
  protected setTimer(): void {
    this.timerId = setInterval(this.updateTimer, 1000);
  }
  /**
   * @method stopTimer остановить таймер боя
   */
  protected stopTimer(callback?: TypeCallback | null): void {
    clearInterval(this.timerId);
    if (callback) {
      callback();
    }
  }
  /**
   * @method resetTimer сбросить таймер боя
   */
  protected resetTimer(callback?: TypeCallback | null): void {
    clearInterval(this.timerId);

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
  protected getFieldCoord = (typeParticipant: TypeParticipant = 'enemy'): HTMLDivElement | null | undefined => {
    return typeParticipant == 'enemy' ? this.FieldCoordEnemy : this.FieldCoordPlayer;
  };
  /**
   * @method getElementCoord - получить элемент координату
   */
  protected getElementCoord = (coord: IntrCoord, typeParticipant: TypeParticipant = 'enemy'): HTMLDivElement | null | undefined => {
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
   * @method checkClassCoord - проверить наличие классов
   */
  protected checkClassCoord = (elCoord: HTMLDivElement): boolean => {
    const isKill = elCoord.classList.contains(this.style.kill);
    const isMiss = elCoord.classList.contains(this.style.miss);
    const isPerimenter = elCoord.classList.contains(this.style.perimeter);
    const isHit = elCoord.classList.contains(this.style.hit);

    return isKill || isMiss || isPerimenter || isHit;
  };
  /**
   * @method proccesHitToCoord - установить попадание по кораблю;
   */
  protected proccesHitToCoord = (coord: IntrCoord, typeParticipant: TypeParticipant = 'enemy'): void => {
    const fieldCoord = this.getFieldCoord(typeParticipant);

    if (fieldCoord) {
      mthdsCoords.setHit(coord, fieldCoord);
    } else {
      const { notFoundField } = this.objError;
      this.setError(notFoundField);
    }
  };
  /**
   * @method proccesMissToCoord - установить промох по кораблю;
   */
  protected proccesMissToCoord = (coord: IntrCoord, typeParticipant: TypeParticipant = 'enemy'): void => {
    const fieldCoord = this.getFieldCoord(typeParticipant);

    if (fieldCoord) {
      mthdsCoords.setMiss(coord, fieldCoord);
    } else {
      const { notFoundField } = this.objError;
      this.setError(notFoundField);
    }
  };
  /**
   * @method proccesKillToCoord - уничтожить корабль
   */
  protected proccesKillToCoord = (dataShip: IntrFullCoordPuttingShip, typeParticipant: TypeParticipant = 'enemy'): void => {
    const { plane } = dataShip.ship;
    const { coords } = dataShip;
    const fieldCoord = this.getFieldCoord(typeParticipant);

    if (fieldCoord) {
      mthdsCoords.setPerimeter(plane, coords, fieldCoord);
      mthdsCoords.setKill(coords, fieldCoord);
      mthdsCoords.showShip(dataShip, fieldCoord);
    } else {
      const { notFoundField } = this.objError;
      this.setError(notFoundField);
    }
  };
  /**
   * @method updateCountRemainingShip обновляем счет
   * @param typePlayers - участник, которому нужно обновить счет
   */
  protected updateCountRemainingShip = (typePlayers: TypeParticipant, count?: number): void => {
    const currentCount = this.getState().battle[typePlayers].countRemainingShip;
    const obj: IntrUpdatingCountRemainingShip = {
      typePlayers: typePlayers,
      countRemainingShip: count ? count : currentCount - 1,
    };

    this.dispatch(actionsBattle.updateCountRemainingShip(obj));

    if (obj.countRemainingShip <= 0 && typePlayers == 'player') {
      this.setResultWinner('enemy');
    }

    if (obj.countRemainingShip <= 0 && typePlayers == 'enemy') {
      this.setResultWinner('player');
    }
  };
  /**
   * @method showAllShipPlayer показываем все корабли игрока
   */
  protected showAllShipPlayer = (): void => {
    const fieldCoord = this.getFieldCoord('player');

    if (fieldCoord) {
      this.coordFullPuttingShipsPlayer.forEach((el) => {
        mthdsCoords.showShip(el, fieldCoord);
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
  protected changeStatusBattle<R>(status: TypeStatusBattle, callback?: TypeCallback<R>): R | void {
    this.dispatch(actionsBattle.setStatusBattle(status));

    if (callback) {
      return callback();
    }
  }
  /**
   * @method changeMoveParticipant изменяем ход
   */
  protected changeMoveParticipant<R>(participant: TypeParticipant, callback?: TypeCallback<R>): R | void {
    this.dispatch(actionsBattle.setParticipantMove(participant));

    if (callback) {
      return callback();
    }
  }
  /**
   * @method showWinner показываем победителя
   */
  protected setResultWinner = (participantWinner: TypeParticipant): void => {
    const { FieldCoordEnemy, coordFullPuttingShipsEnemy, dispatch } = this;

    this.stopTimer();
    dispatch(actionsBattle.setStatusBattle('finished'));

    if (FieldCoordEnemy) {
      coordFullPuttingShipsEnemy.forEach((el) => {
        mthdsCoords.showShip(el, FieldCoordEnemy);
      });
    }

    setTimeout(() => {
      dispatch(actionsBattle.setResultBattle(participantWinner));
    }, 500);
  };
  /**
   * @method setError устанавливаем ошибку
   *
   * **Примечание**
   *  - Пустая строка '' - удаление ошибки.
   */
  protected setError = (message: string): void => {
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
export class BattleBot extends Battle {
  nameClass = 'BattleBot';

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

  constructor(bot) {
    super();
    this.bot = bot;
    this.updateCountRemainingShip('player', 10);
  }
  /**
   * @method setFirstMove - определяем кто первый ходит
   */
  setFirstMove(): void {
    const firstMove: TypeParticipant = Math.random() > 0.5 ? 'player' : 'enemy';
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
      const nextMove: TypeParticipant = moveParticipant == 'enemy' ? 'player' : 'enemy';

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

      this.coordFullPuttingShipsEnemy = transformationToFullCoordShips(coordPuttingShipsEnemy);
      this.coordFullPuttingShipsPlayer = transformationToFullCoordShips(coordPuttingShipsPlayer);
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
    function checkShotToCoord(coordsShot: IntrCoord, coordFullPuttingShips: IntrFullDataShipBattle[]): IntrDataShot {
      const objResult: IntrDataShot = {
        status: 'miss',
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

            const statusHit = sizeShip == countHit ? 'kill' : 'hit';
            dataShip.countHit = countHit;
            dataShip.isKill = statusHit == 'kill';

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
    const checkResultShot = (resultShot: IntrDataShot, shotToParticipant: TypeParticipant): void => {
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
    const resetMoveParticipant = (changeMoveParticipant: TypeParticipant): void => {
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
    const isCountRemainingShip = (typePlayers: TypeParticipant): boolean => {
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
    this.changeStatusBattle('game');
    this.activateMoveParticipant();
  };

  /**
   * @method activateMoveParticipant - активация хода участника
   */
  private activateMoveParticipant = (): void => {
    try {
      const { moveParticipant } = this.getState().battle.battle;

      if (moveParticipant == 'player') {
        this.MovePlayer();
      } else if (moveParticipant == 'enemy') {
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
    const resultShot: IntrDataShot = this.privateMthds.checkShotToCoord(selectCoord, this.coordFullPuttingShipsPlayer);
    const coords = resultShot.dataShip ? resultShot.dataShip.coords : undefined;
    const { status } = resultShot;

    this.privateMthds.checkResultShot(resultShot, 'player');
    this.bot.updateShotResult(selectCoord, status, coords);

    if (status == 'hit') {
      this.privateMthds.resetMoveParticipant();

      standartSetTimeout(1000, () => this.MoveBot(selectCoord));
    }

    if (status == 'kill' && resultShot.dataShip) {
      this.updateCountRemainingShip('player');
      this.privateMthds.resetMoveParticipant();
      isCountShipEnemy = this.privateMthds.isCountRemainingShip('player');

      if (isCountShipEnemy) standartSetTimeout(1000, this.MoveBot);
    }

    if (!isCountShipEnemy) {
      this.privateMthds.resetMoveParticipant();
      return;
    }

    if (status == 'miss') {
      this.privateMthds.resetMoveParticipant('player');
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

      const resultShot: IntrDataShot = this.privateMthds.checkShotToCoord(objCoord, this.coordFullPuttingShipsEnemy);
      this.privateMthds.checkResultShot(resultShot, 'enemy');

      if (resultShot.status == 'kill') {
        this.updateCountRemainingShip('enemy');
        isCountShipEnemy = this.privateMthds.isCountRemainingShip('enemy');
      }

      if (!isCountShipEnemy) {
        this.privateMthds.resetMoveParticipant();
        this.FieldCoordEnemy?.removeEventListener('click', this.handlerClickRect);
      }

      if (resultShot.status == 'miss') {
        this.privateMthds.resetMoveParticipant('enemy');
        this.FieldCoordEnemy?.removeEventListener('click', this.handlerClickRect);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setError(error.message);
      } else {
        this.setError('Неизвестная ошибка');
      }

      this.privateMthds.resetMoveParticipant('enemy');
      this.FieldCoordEnemy?.removeEventListener('click', this.handlerClickRect);
    }
  };
}

export class BattleRealUser extends Battle {
  constructor() {
    super();
  }
}
