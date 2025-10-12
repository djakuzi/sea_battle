import { TypeCallback } from "@app-common/types/typeCallback.type";
import Websocket from "../../WebSocket";
import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { ServiceProcces } from "./services/procces.service";
import { ServiceSession } from "./services/session.service";
import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import { LOG_SESSION_QUEUE } from "@app-core/data/list-log/sessionQueue";
import { ServiceQueue } from "./services/queue.service";
import { IntrInfoEnemy } from "@app-layouts/Battle/type/Battle.interface";
import { IntrFullCoordPuttingShip } from "@app-common/types/Ship.interface";
import { ServiceCommon } from "./services/common.service";

export interface IntrServices {
	procces: ServiceProcces,
	session: ServiceSession,
	queue: ServiceQueue,
	common: ServiceCommon,
}

export interface IntrData {
	idSession: string | null,
	enemy: IntrInfoEnemy | null,
	firstMove: string | null,
	ships: IntrFullCoordPuttingShip[] | null,
}

export class CoreOneVsOne extends Websocket {
	data: IntrData =  {
		idSession: null,
		enemy: null,
		firstMove: null,
		ships: []
	}

	readonly services: IntrServices = {
		procces: new ServiceProcces(this),
		session: new ServiceSession(this),
		queue: new ServiceQueue(this),
		common: new ServiceCommon(this),
	}

	constructor(
		path: string,
	) {
		super(path);
	}

	connect = (callback?: TypeCallback): void => {
		super._connect(() => {
			devModeConsole('log', LOG_SESSION_QUEUE.connection.log);

			runCallback(callback);
		});
	};

	disconnect = (callback?: TypeCallback): void => {
		super._disconnect(() => {
			devModeConsole('log', LOG_SESSION_QUEUE.disconnected.log);
			
			this.services.common.reset();

			runCallback(callback);
		});
	};

	reconnect = (callback?: TypeCallback): void => {
		super._reconnect(() => {
			runCallback(callback);
		});
	};
}

export const WsOneVsOne = new CoreOneVsOne('/battle-one-vs-one');
export type TypeWsOneVsOne = typeof WsOneVsOne;