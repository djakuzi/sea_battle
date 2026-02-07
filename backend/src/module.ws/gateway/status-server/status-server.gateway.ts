import { ConnectedSocket, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DefaultGateway } from 'src/common/gateway /default.gateway';
import { ServiceStorageSocket } from 'src/common/service/StorageSocketService';
import { PingService } from './service/ping.service';
import { ServiceOnlinePlayers } from 'src/module.api/info/service/onlinePlayers.service';

@WebSocketGateway({
	namespace: 'status-server',
	transports: ['websocket'],
	cors: {
		origin: '*',
	},
})
export class GatewayStatusServer extends DefaultGateway {
	constructor(
		private readonly serviceStorageSocket: ServiceStorageSocket,
		private readonly servicePing: PingService,
		private readonly serviceOnlinePlayers: ServiceOnlinePlayers
	) {
		super('status-server');
	}

	async handleConnection(client: Socket) {
		const userId = this.getPlayerId(client);

		if (userId) {
			this.serviceStorageSocket.registerSocket(userId, this.namespace, client.id);
			this.serviceOnlinePlayers.addPlayer(userId);
		}

		console.log(`Client connected: ${client.id}. Player id: ${userId}`);
	}

	async handleDisconnect(client: Socket) {
		const playerId = this.getPlayerId(client);

		if (playerId) {
			this.serviceStorageSocket.unregisterSocket(playerId, this.namespace);
			this.serviceOnlinePlayers.removePlayer(playerId);
		}

		console.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('ping')
	async handlePing(@ConnectedSocket() client: Socket): Promise<void> {
		await this.servicePing.sendPing(client);
	}
}
