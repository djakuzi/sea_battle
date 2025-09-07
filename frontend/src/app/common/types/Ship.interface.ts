import { TypeSizeShip, TypePlaneShip } from './Ship.type';

/** IntrCoordPuttingShip - ширина кораблей
 */
export interface IntrWidthShip {
  one: number;
  two: number;
  three: number;
  four: number;
}

/** IntrCoordShip - данные о корабле
 */
export interface IntrCoordShip {
  index: number;
  size: TypeSizeShip;
  plane: TypePlaneShip;
}

/** IntrCoord - вид координат
 */
export interface IntrCoord {
  x: number;
  y: number;
}

/** IntrCoordPuttingShip - данные о корабле и его координатах:
 */
export interface IntrCoordPuttingShip {
  ship: IntrCoordShip;
  firstCoord: IntrCoord;
  lastCoord: IntrCoord;
}

/** IntrCoordPuttingShip - данные о корабле с полным списком координат.
 */
export interface IntrFullCoordPuttingShip {
  ship: IntrCoordShip;
  coords: IntrCoord[];
}

/** IntrCoordPuttingShip - данные о корабле с координатами и статусом в бою.
 * @extends IntrFullCoordPuttingShip - данные о корабле с полным списком координат
 */
export interface IntrFullDataShipBattle extends IntrFullCoordPuttingShip {
  countHit: number;
  isKill: boolean;
}
