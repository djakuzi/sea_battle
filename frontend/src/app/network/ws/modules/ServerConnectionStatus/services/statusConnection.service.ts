import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { SERVER_STATUS } from "@app-core/data/list-error/serverStatus";
import { actionsServerStatus } from "../../../../../redux/slice/status-server/serverStatus.slice";
import store from "@app-redux/store";
import { createNotificftionByList } from "@app-rootController/Visual-Interface/elements/Notification/modules/notification";
import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import { WsServerStatus } from "../ServerStatus.module";
import { TypeCallback } from "@app-common/types/typeCallback.type";

export class ServiceStatusConnection {
	static firstConnect: boolean;

	static onConnect(callback?: TypeCallback): void {
		WsServerStatus._onSubscribe('connect', () => {
			store.dispatch(actionsServerStatus.setIsConnect());

			if (!WsServerStatus.state.isFirstConnect && WsServerStatus.state.isReconnect) {
				createNotificftionByList('notification', SERVER_STATUS.connected.notification);
				devModeConsole('log', SERVER_STATUS.connected.log);
			}

			runCallback(callback);
		});
	}

	static onDisconnect(callback?: () => void): void {
		WsServerStatus._onSubscribe('disconnect', () => {
			store.dispatch(actionsServerStatus.setIsDisconnect());

			createNotificftionByList('notification', SERVER_STATUS.disconnected.notification);
			devModeConsole('log', SERVER_STATUS.disconnected.log);

			runCallback(callback);
		});
	}

	static onConnectError(callback?: () => void): void {
		WsServerStatus._onSubscribe('connect_error', () => {
			store.dispatch(actionsServerStatus.setIsDisconnect());

			createNotificftionByList('error', SERVER_STATUS.connectError.notification);
			devModeConsole('error', SERVER_STATUS.connectError.log);

			runCallback(callback);
		});
	}

	static onConnectTimeout(callback?: () => void): void {
		WsServerStatus._onSubscribe('connect_timeout', () => {
			store.dispatch(actionsServerStatus.setIsDisconnect());

			createNotificftionByList('error', SERVER_STATUS.timeout.notification);
			devModeConsole('error', SERVER_STATUS.timeout.log);

			runCallback(callback);
		});
	}

	static onReconnectFailed(callback?: () => void): void {
		WsServerStatus._onSubscribe('reconnect_failed', () => {
			store.dispatch(actionsServerStatus.setIsConnection());
			createNotificftionByList('error', SERVER_STATUS.reconnectFailed.notification);
			devModeConsole('error', SERVER_STATUS.reconnectFailed.log);

			runCallback(callback);
		});
	}

	static onReconnectAttempt(callback?: TypeCallback<void, [number]>): void {
		WsServerStatus._onSubscribe('reconnect_attempt', (attemptNumber: number) => {
			devModeConsole('log', `${SERVER_STATUS.tryReconnecting.log} (attempt: ${attemptNumber})`);

			createNotificftionByList('notification', SERVER_STATUS.tryReconnecting.notification);

			runCallback(callback, attemptNumber);
		});
	}
}
