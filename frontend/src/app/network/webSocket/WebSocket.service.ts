import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { ManagerSocket } from "./WebSocket.socket-io";
import { TypeCallback } from "@app-common/types/typeCallback.type";

class WebsocketService {
    readonly socket: SocketIOClient.Socket;
    readonly path: string;
    constructor(
        path: string = ''
    ) {
        this.socket = ManagerSocket.createSocket(path);
        this.path = path;
    }

    protected connect(callback?: TypeCallback): void {
        this.socket.connect();

        runCallback(callback);
    };

    protected disconnect(callback?: TypeCallback): void {
        this.socket.disconnect();

        runCallback(callback);
    };

    protected onConnect(callback: TypeCallback): void {
        this.socket.on('connect', callback);
    };

    protected onDisconnect(callback: TypeCallback): void {
        this.socket.on('disconnect', callback);
    };

    protected onConnectError(callback: TypeCallback): void {
        this.socket.on('connect_error', callback);
    }

    protected onConnectTimeout(callback: TypeCallback): void {
        this.socket.on('connect_timeout', callback);
    }

    protected onReconnectFailed(callback: TypeCallback): void {
        this.socket.on('reconnect_failed', callback);
    }

    protected onSubscribe(event: string, callback: TypeCallback): void {
        this.socket.on(event, callback);
    }

    protected unSubscribe(event: string): void {
        this.socket.off(event);
    }

    protected emit<D>(event: string, data?: D): void {
        this.socket.emit(event, data);
    }
}

export default WebsocketService;
