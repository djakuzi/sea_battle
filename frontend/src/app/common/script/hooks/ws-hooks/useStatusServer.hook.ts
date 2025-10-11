import { WsOneVsOne } from "@app-network/ws/modules/BattleOneVsOne/OneVsOne.module";
import { WsServerStatus } from "../../../../network/ws/modules/ServerConnectionStatus/ServerStatus.module";
import { ServiceStatusConnection } from "@app-network/ws/modules/ServerConnectionStatus/services/statusConnection.service";
import { RootState } from "@app-redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface IntrHookStatusServer {
	isConnection: boolean;
	isConnect: boolean;
	isDisconnect: boolean | null;
}

export function useStatusServer(): IntrHookStatusServer {
	//redux
	const { isConnection, isConnect, isDisconnect } = useSelector((s: RootState) => s.statusServer);

	useEffect(() => {
		WsServerStatus.connect();

		ServiceStatusConnection.onConnect()

		ServiceStatusConnection.onConnectTimeout(() => { });

		ServiceStatusConnection.onConnectError(() => { });

		ServiceStatusConnection.onReconnectFailed(() => { });

		ServiceStatusConnection.onReconnectAttempt(() => { });

		return (): void => {
			WsServerStatus.disconnect();
		};
	}, []);

	return {
		isConnection,
		isConnect,
		isDisconnect,
	}
}