import { IntrFullDataShipBattle } from "@app-common/types/Ship.interface";
import { TypeCallback } from "@app-common/types/typeCallback.type";

export interface IntrEventWinner {
	idWinner: string,
	shipsEnemy: IntrFullDataShipBattle[];
}

export interface IntrOnWinner {
	callback?: TypeCallback<void, [IntrEventWinner]>;
}
