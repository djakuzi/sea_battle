import { TypeCallback } from "@app-common/types/typeCallback.type";
import WebsocketService from "@app-network/webSocket/WebSocket.service";

export class ServiceServerConnectionStatus extends WebsocketService {
    constructor(
        path: string
    ) {
        super(path);
    }

    connect = (callback?: TypeCallback): void => {
        super.connect(callback);
    };

    disconnect = (callback?: TypeCallback): void => {
        super.disconnect(callback);
    };

    listenConnect = (callback: TypeCallback): void => {
        super.onConnect(callback);
    };

    listenDisconnect = (callback: TypeCallback): void => {
        super.onDisconnect(callback);
    };

    listenConnectError = (callback: TypeCallback): void => {
        super.onConnectError(callback);
    };

    listenConnectTimeout = (callback: TypeCallback): void => {
        super.onConnectTimeout(callback);
    };

    listenReconnectFailed = (callback: TypeCallback): void => {
        super.onReconnectFailed(callback);
    };

    listennerPing = (callback: TypeCallback): void => {
        super.onSubscribe('updatePing', callback);
    };

    emitPing = (): void => {
        super.emit('sendPing');
    };
}