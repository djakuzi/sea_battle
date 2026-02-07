import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
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
		const idPlayer = this.getPlayerId(client);

		if (idPlayer) {
			await this.serviceQueue.addPlayerToQueue(client, idPlayer);
			this.serviceStorageSocket.registerSocket(idPlayer, this.namespace, client.id);
		}
	}

	async handleDisconnect(client: Socket) {
		try {
			const idPlayer = this.getPlayerId(client);

			if (idPlayer) {
				const idSession = this.serviceGameSessions.playerSession.get(idPlayer);

				if (idSession) {
					this.serviceGame.leaveParticipant(idPlayer, idSession)
				} else {
					this.serviceQueue.removePlayerFromQueue(idPlayer);
				}

				this.serviceStorageSocket.unregisterSocket(idPlayer, this.namespace);
			}
		} catch (error) {
			console.error(error);
		}
	}

	@SubscribeMessage('sendShipData')
	async handleShipData(
		@MessageBody() payload: { idSession: string; ships: IntrFullInfoShip[] },
		@ConnectedSocket() client: Socket,
	): Promise<void> {
		const idPlayer = this.getPlayerId(client);

		const { idSession, ships } = payload;

		try {
			await this.serviceGameSessions.sub.sendShipData(idPlayer, ships, idSession);
		} catch (error){
			/**
			 * TODO: add to logger list
			 */
			console.error(error);
		}
	}

	@SubscribeMessage('shotByParticipant')
	async handleShotByParticipant(
		@MessageBody() payload: { idSession: string; coord: IntrShipCoord },
		@ConnectedSocket() client: Socket,
	): Promise<void> {
		const idPlayer = this.getPlayerId(client);

		const { idSession, coord } = payload;

		try {
			await this.serviceGame.sub.shotByParticipant(
				idPlayer,
				idSession,
				coord
			)
		} catch (error) {
			console.error(error);
		}
	}
}
