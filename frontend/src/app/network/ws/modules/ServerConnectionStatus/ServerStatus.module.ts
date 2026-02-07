import { TypeCallback } from "@app-common/types/typeCallback.type";
import Websocket from "../../WebSocket";
import store from "@app-redux/store";
import { actionsServerStatus } from "../../../../redux/slice/status-server/serverStatus.slice";
import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { createNotificftionByList } from "@app-rootController/Visual-Interface/elements/Notification/modules/notification";
import { LOG_SERVER_STATUS } from "../../../../core/data/list-log/serverStatus";
import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";

export class CoreServerStatus extends Websocket {
	constructor(
		path: string
	) {
		super(path);
	}

	connect = (callback?: TypeCallback): void => {
		super._connect(() => {
			store.dispatch(actionsServerStatus.setIsConnection());

			if (!this.state.isFirstConnect) {
				createNotificftionByList('notification', LOG_SERVER_STATUS.connection.notification);
				devModeConsole('log', LOG_SERVER_STATUS.connection.log);
			}

			runCallback(callback);
		});
	};

	disconnect = (callback?: TypeCallback): void => {
		super._disconnect(() => {
			store.dispatch(actionsServerStatus.setIsDisconnect());

			createNotificftionByList('notification', LOG_SERVER_STATUS.disconnected.notification);
			devModeConsole('log', LOG_SERVER_STATUS.disconnected.log);

			runCallback(callback);
		});
	};

	reconnect = (callback?: TypeCallback): void => {
		super._reconnect(() => {
			store.dispatch(actionsServerStatus.setIsConnection());

			createNotificftionByList('notification', LOG_SERVER_STATUS.reconnecting.notification);
			devModeConsole('log', LOG_SERVER_STATUS.tryReconnecting.log);

			runCallback(callback);
		});
	};
}

export const WsServerStatus = new CoreServerStatus('/status-server');
export type TypeWsServerStatus = typeof WsServerStatus;