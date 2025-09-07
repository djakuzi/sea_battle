import { Manager } from "socket.io-client";
import { CONFIG_WEBSOCKET } from "./WebSocket.confing";
import { getPlayerId } from "./methods/getPlayerId";
import { TypeCallback } from "@app-common/types/typeCallback.type";
import { runCallback } from "@app-common/script/utils/callback/method/runCallback";

class ManagerCore {
    manager: SocketIOClient.Manager;
    private mapSockets: Map<string, SocketIOClient.Socket>;

    constructor() {
        this.manager = new Manager('', {
            ...CONFIG_WEBSOCKET,
            query: {
                userId: getPlayerId(),
            }
        });

        this.mapSockets = new Map();
    }

    createSocket(path: string = ''): SocketIOClient.Socket {
        if (this.mapSockets.has(path)) {
            this.mapSockets.get(path)?.disconnect();
            this.mapSockets.delete(path);
        }

        const socket = this.manager.socket(path);
        this.mapSockets.set(path, socket);
        return socket;
    }

    getSocket(path: string): SocketIOClient.Socket | null {
        return this.mapSockets.get(path) || null;
    }

    disconnectSocket(path: string, callback?: TypeCallback):void {
        const socket = this.mapSockets.get(path);
        
        if (socket) {
            socket.disconnect();
            this.mapSockets.delete(path);
        }

        runCallback(callback);
    }

    getAllSockets(): Map<string, SocketIOClient.Socket> {
        return this.mapSockets;
    }
}

export const ManagerSocket = new ManagerCore();