import { IntrFullInfoShip, IntrShipCoord } from "src/common/types/ship/ship.interface";
import { EnumStatusShot } from "./game.enum";

/** IntrDataShot - данные о выстреле
  - status: статус выстрела
  - coord: координата по который был выстрел
  - dataShip: данные корабля, если был выстрел по нему
*/
export interface IntrDataShot {
	status: EnumStatusShot;
	coord: IntrShipCoord;
	dataShip: IntrFullInfoShip | false;
}