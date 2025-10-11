import { TypeCallback } from "@app-common/types/typeCallback.type";
import Websocket from "../../WebSocket";
import store from "@app-redux/store";
import { actionsServerStatus } from "../../../../redux/slice/status-server/serverStatus.slice";
import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { createNotificftionByList } from "@app-rootController/Visual-Interface/elements/Notification/modules/notification";
import { SERVER_STATUS } from "@app-core/data/list-error/serverStatus";
import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";

export class CoreOneVsOne extends Websocket {
	constructor(
		path: string
	) {
		super(path);
	}

	connect = (callback?: TypeCallback): void => {
		super._connect(() => {
			runCallback(callback);
		});
	};

	disconnect = (callback?: TypeCallback): void => {
		super._disconnect(() => {
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