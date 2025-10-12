import { IntrCoord } from "@app-common/types/Ship.interface";
import { TypeCallback } from "@app-common/types/typeCallback.type";
import { IntrDataShot } from "@app-layouts/Battle/type/Battle.interface";

export interface IntrOnShotByEnemy {
	coord: IntrCoord;
}

export interface IntrOnMyShot {
	callback?: TypeCallback<void, [IntrDataShot, string]>;
}

export interface IntrEventMyShot {
	resultShot: IntrDataShot;
	moveParticipant: string;
}

export interface IntrOnShotAtMe {
	callback?: TypeCallback<void, [IntrDataShot, string]>;
}

export interface IntrEventShotAtMe {
	resultShot: IntrDataShot;
	moveParticipant: string;
}