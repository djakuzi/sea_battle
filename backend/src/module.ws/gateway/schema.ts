import { IntrSchemaWebsocket } from "src/common/types/websocket/schemaWebsocket";
import { PingService } from "./status-server/service/ping.service";
import { GatewayStatusServer } from "./status-server/status-server.gateway";
import { GatewayBattleOneVsOne } from "./battle-one-vs-one/battleOneVsOne.gateway";
import { ServiceStorageSocket } from "src/common/service/StorageSocketService";
import { ServiceGame } from "./battle-one-vs-one/service/game/game.service";
import { ServiceGameSessions } from "./battle-one-vs-one/service/gameSession/gameSession.service";
import { ServiceQueue } from "./battle-one-vs-one/service/queue/queue.service";

export const SCHEMA_WEBSCOKET:IntrSchemaWebsocket = {
	gateway: [
		GatewayStatusServer,
		GatewayBattleOneVsOne
	],
	service: {
		'status-server': [
			PingService
		],
		'battle-one-vs-one': [
			ServiceGame,
			ServiceGameSessions,
			ServiceQueue
		],
	},
	dependencies: [
		ServiceStorageSocket,
	]
}
