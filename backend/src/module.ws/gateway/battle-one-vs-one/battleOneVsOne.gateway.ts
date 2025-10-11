import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DefaultGateway } from 'src/common/gateway /default.gateway';
import { ServiceStorageSocket } from 'src/common/service/StorageSocketService';
import { ServiceQueue } from './service/queue/queue.service';
import { ServiceGameSessions } from './service/gameSession/gameSession.service';
import { IntrFullInfoShip, IntrShipCoord } from 'src/common/types/ship/ship.interface';
import { ServiceGame } from './service/game/game.service';

@WebSocketGateway({
	namespace: 'battle-one-vs-one',
	transports: ['websocket'],
	cors: {
		origin: '*',
	},
})
export class GatewayBattleOneVsOne extends DefaultGateway {
	constructor(
		private readonly serviceStorageSocket: ServiceStorageSocket,
		private readonly serviceQueue: ServiceQueue,
		private readonly serviceGameSessions: ServiceGameSessions,
		private readonly serviceGame: ServiceGame,
	) {
		super('battle-one-vs-one');
	}

	async handleConnection(client: Socket) {
		const playerId = this.getPlayerId(client);

		if (playerId) {
			await this.serviceQueue.addPlayerToQueue(client, playerId);
			this.serviceStorageSocket.registerSocket(playerId, this.namespace, client.id);
		}
	}

	async handleDisconnect(client: Socket) {
		const playerId = this.getPlayerId(client);

		if (playerId) {
			this.serviceQueue.removePlayerFromQueue(playerId);
			this.serviceStorageSocket.unregisterSocket(playerId, this.namespace);
		}
	}

	@SubscribeMessage('sendShipData')
	async handleShipData(
		@MessageBody() payload: { sessionId: string; ships: IntrFullInfoShip[] },
		client: Socket,
	): Promise<void> {
		const playerId = this.getPlayerId(client);

		const { sessionId, ships } = payload;

		try {
			await this.serviceGameSessions.sub.sendShipData(playerId, ships, sessionId);
		} catch {
			/**
			 * TODO: add to logger list
			 */
			console.error('Ошибка')
		}
	}

	@SubscribeMessage('shotByParticipant')
	async handleShotByParticipant(
		@MessageBody() payload: { sessionId: string; coord: IntrShipCoord },
		client: Socket,
	): Promise<void> {
		const playerId = this.getPlayerId(client);

		const { sessionId, coord } = payload;

		try {
			await this.serviceGame.sub.shotByParticipant(
				playerId,
				sessionId,
				coord
			)
		} catch {
			console.error('Ошибка');
		}
	}
}
