import { IntrFullInfoShip } from "src/common/types/ship/ship.interface";

/** IntrCoordPuttingShip - данные о корабле с координатами и статусом в бою.
 * @extends IntrDataShipGame - данные о корабле с полным списком координат
 */
export interface IntrDataShipGame extends IntrFullInfoShip {
	countHit: number;
	isKill: boolean;
}