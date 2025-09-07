import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DefaultGateway } from 'src/common/gateway /default.gateway';
import { ServiceStorageSocket } from 'src/common/service/StorageSocketService';

@WebSocketGateway({
    namespace: 'battle',
    transports: ['websocket'],
    cors: {
        origin: '*',
    },
})
export class BattleGateway extends DefaultGateway {
    constructor(
        private readonly serviceStorageSocket: ServiceStorageSocket
    ) {
        super('battle');
    }

    handleConnection(client: Socket) {
        const playerId = this.getPlayerId(client);

        if (playerId) {
            this.serviceStorageSocket.registerSocket(playerId, this.namespace, client.id);
        }

        console.log(`Client connected: ${client.id}. Player id: ${playerId}`);
        this.server.emit('status', { message: 'Сервер доступен дли битв!' });
    }

    handleDisconnect(client: Socket) {
        const playerId = this.getPlayerId(client);

        if (playerId) {
            this.serviceStorageSocket.unregisterSocket(playerId, this.namespace);
        }

        console.log(`Client disconnected: ${client.id}`);
        this.server.emit('status', { message: 'Сервер недоступен!' });
    }
}