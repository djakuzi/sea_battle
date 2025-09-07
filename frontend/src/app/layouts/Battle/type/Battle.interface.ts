import { TypeBattle, TypeEnemy, TypeParticipant, TypeResultBattle, TypeStatusBattle, TypeStatusShot } from '../types/battle';
import { IntrCoord, IntrCoordPuttingShip, IntrFullCoordPuttingShip } from '../../../common/types/Ship.interface';

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
  status: TypeStatusShot;
  coord: IntrCoord;
  dataShip: IntrFullCoordPuttingShip | false;
}

export interface IntrUpdatingCountRemainingShip {
  typePlayers: TypeParticipant;
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
  id: number;
  experience: number;
  nickname: string;
}

/** IntrInfoEnemy - данные о противнике игрока в битве
  - typeEnemy: тип соперника
*/
export interface IntrInfoEnemy extends IntrGeneralInfoParticipant, IntrEnemyBattle {
  typeEnemy: TypeEnemy;
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
  type: TypeBattle;
  moveParticipant: TypeParticipant;
  status: TypeStatusBattle;
  winner: TypeResultBattle;
  timer: IntrTimerBattle;
  error: string | '';
}
