import { IntrDataShipGame } from "src/game/core/types/gameShip.interface";

export interface IntrWinner {
	idWinner: string;
	shipsEnemy: IntrDataShipGame[];
}