import { EnumEnemy, EnumParticipant, EnumResultBattle, EnumStatusBattle, EnumStatusShot } from '../types/battle.enum';
import { IntrCoord, IntrCoordPuttingShip, IntrFullCoordPuttingShip } from '../../../common/types/Ship.interface';
import { EnumVariantPlayType } from '@app-core/data/list-component/interfaces/variantsPlay.interface';

/** IntrTimerBattle - данные таймера
  - time: время в секундах
  - displayTime: для вывода на дисплей игрока
*/
export interface IntrTimerBattle {
	time: number;
	minutes: string;
	seconds: string;
}

/** IntrDataShot - данные о выстреле
  - status: статус выстрела
  - coord: координата по который был выстрел
  - dataShip: данные корабля, если был выстрел по нему
*/
export interface IntrDataShot {
	status: EnumStatusShot;
	coord: IntrCoord;
	dataShip: IntrFullCoordPuttingShip | false;
}

/** IntrDataShot - данные о выстреле от сервера
  - isShotedCoord: был ли выстрел по такой координате или нет
*/
export interface IntrOnlineDataShot extends IntrDataShot {
	isShotedCoord?: boolean,
}

export interface IntrUpdatingCountRemainingShip {
	typePlayers: EnumParticipant;
	countRemainingShip: number;
}

/** IntrGeneralInfoParticipant - общие данные о участниках битвы
  - countRemainingShip: количество оставшихся кораблей;
  - coordPuttingShips: массив координат кораблей
*/
export interface IntrGeneralInfoParticipant {
	countRemainingShip: number;
	coordPuttingShips?: IntrCoordPuttingShip[];
}

/** IntrInfoPlayer - данные о игроке битвы
  - в данный момент
*/
export interface IntrInfoPlayer extends IntrGeneralInfoParticipant {
	coordPuttingShips?: IntrCoordPuttingShip[];
}

export interface IntrEnemyBattle {
	id: string;
	experience: number;
	nickname: string;
}

/** IntrInfoEnemy - данные о противнике игрока в битве
  - typeEnemy: тип соперника
*/
export interface IntrInfoEnemy extends IntrGeneralInfoParticipant, IntrEnemyBattle {
	typeEnemy: EnumEnemy;
	guestOrPlayer?: 'guest' | 'player';
}

/** IntrDataBattle - данные о битве
  - id: id битвы;
  - roomId: id комнаты битвы;
  - isPlayerMove: ход игрока или противника;
  - status: статус битвы;
  - type: тип битвы;
*/
export interface IntrDataBattle {
	id: number;
	roomId: number;
	type: EnumVariantPlayType;
	moveParticipant: EnumParticipant;
	status: EnumStatusBattle;
	winner: EnumResultBattle;
	timer: IntrTimerBattle;
	error: string | '';
}
