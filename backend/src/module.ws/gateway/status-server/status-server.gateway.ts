import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DefaultGateway } from 'src/common/gateway /default.gateway';
import { ServiceStorageSocket } from 'src/common/service/StorageSocketService';

@WebSocketGateway({
    namespace: 'status-server',
    transports: ['websocket'],
    cors: {
        origin: '*',
    },
})
export class StatusServerGateway extends DefaultGateway  {
    constructor(
        private readonly serviceStorageSocket: ServiceStorageSocket
    ) {
        super('status-server');
    }

    handleConnection(client: Socket) {
        const playerId = this.getPlayerId(client);

        if (playerId) {
            this.serviceStorageSocket.registerSocket(playerId, this.namespace, client.id);
        }

        console.log(`Client connected: ${client.id}. Player id: ${playerId}`);
    }

    handleDisconnect(client: Socket) {
        const userId = this.getPlayerId(client);

        if (userId) {
            this.serviceStorageSocket.unregisterSocket(userId, this.namespace);
        }

        console.log(`Client disconnected: ${client.id}`);
    }
}