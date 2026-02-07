import { isDevMode } from "@app-common/script/modules/Developer/methods/isDevMode";
import { LOG_SERVER_STATUS } from "../../../../../core/data/list-log/serverStatus";
import store from "@app-redux/store";
import { createNotificftionByList } from "@app-rootController/Visual-Interface/elements/Notification/modules/notification";

interface IntrIsDisconnectedServer {
	isNotification?: boolean;
	isNotificationMes?: string
}

export function isDisconnectedServer({
	isNotification = true,
	isNotificationMes = LOG_SERVER_STATUS.noConnected.notification
}: IntrIsDisconnectedServer
) {
	try {
		const { isConnect } = store.getState().statusServer;
		const res = !isConnect;

		if (res && isNotification) {
			createNotificftionByList(
				'error',
				isNotificationMes,
				false
			)
		}

		if (res && isDevMode()) console.error(LOG_SERVER_STATUS.noConnected.log);

		return res
	} catch (error) {
		console.error(error);
	}
}