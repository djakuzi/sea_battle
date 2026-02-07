import { IntrCoord } from "@app-common/types/Ship.interface";
import { TypeCallback } from "@app-common/types/typeCallback.type";
import { IntrDataShot, IntrOnlineDataShot } from "@app-layouts/Battle/type/Battle.interface";
import { IntrEventUpdateTime } from "./gameTime";

export interface IntrOnShotByEnemy {
	coord: IntrCoord;
}

export interface IntrOnMyShot {
	callback?: TypeCallback<void, [IntrDataShot, string]>;
}

export interface IntrEventMyShot {
	resultShot: IntrOnlineDataShot;
	moveParticipant: string;
}

export interface IntrOnShotAtMe {
	callback?: TypeCallback<void, [IntrDataShot, string]>;
}

export interface IntrOnUpdateTime {
	callback?: TypeCallback<void, [IntrEventUpdateTime]>;
}

export interface IntrEventShotAtMe {
	resultShot: IntrOnlineDataShot;
	moveParticipant: string;
}