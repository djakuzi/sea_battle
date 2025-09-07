import { Logger } from "@nestjs/common";
import { OnGatewayInit, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

export class DefaultGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;
    
    namespace: string;
    private readonly logger = new Logger(DefaultGateway.name);
    
    constructor(
        namespace: string,
    ) {
        this.namespace = namespace;
    }

    afterInit(): void {
        this.logger.log('Succes init websocket: ' + this.namespace)
    }

    getPlayerId(client: Socket): string | null {
        try {
            const userId = client.handshake.query.userId as string;
            return userId ? userId : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}