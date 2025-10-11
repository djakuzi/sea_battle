import { Logger } from '@nestjs/common';
import { OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ExceptionUserNotFound } from '../util/error/methods/notFoundUser';
import { ExceptionPlayerNotFound } from '../util/error/methods/notFoundPlayer';

export class DefaultGateway implements OnGatewayInit {
	@WebSocketServer()
	server: Server;

	namespace: string;
	private readonly logger = new Logger(DefaultGateway.name);

	constructor(namespace: string) {
		this.namespace = namespace;
	}

	afterInit(): void {
		this.logger.log('Succes init websocket: ' + this.namespace);
	}

	getPlayerId(client: Socket): string {
		try {
			const playerId = client.handshake.query.playerId as string;
			
			if (!playerId) {
				throw new ExceptionPlayerNotFound(playerId);
			}

			return playerId;
		} catch (error) {
			console.error(error);
			throw new ExceptionPlayerNotFound();
		}
	}
}
