import { TypePlaneShip, TypeSizeShip } from "./ship.type";

export interface IntrShip {
	index: number;
	size: TypeSizeShip;
	plane: TypePlaneShip;
}

export interface IntrShipCoord {
	x: number;
	y: number;
}

/** IntrFullInfoShip - данные о корабле с полным списком координат.
 */
export interface IntrFullInfoShip {
	ship: IntrShip;
	coords: IntrShipCoord[];
}