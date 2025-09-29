import { Manager } from "socket.io-client";
import { TypeCallback } from "@app-common/types/typeCallback.type";
import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { CONFIG_WEBSOCKET_MANAGER } from "./WebSocketManager.confing";
import { getPlayerId } from "@app-common/script/modules/Player/methods/getPlayerId";
import { getAccessToken } from "../../common/script/modules/Player/methods/getAccessToken";
import { LIST_EVENT } from "@app-core/data/event/listNameEvents";
import EventManager from "../../event/EventManager";
import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import Websocket from "./WebSocket";

class ManagerCore {
    manager: SocketIOClient.Manager;
    managerLs: ManagerListener;
    private mapWebsockets: Map<string, Websocket>;
    private currentPlayerId: string;
    private currentAccessToken: string | null;

    constructor() {
        this.currentPlayerId = getPlayerId();
        this.currentAccessToken = getAccessToken();

        this.manager = new Manager('', {
            ...CONFIG_WEBSOCKET_MANAGER,
            query: {
                userId: getPlayerId(),
                accessToken: getAccessToken(),
            }
        });

        this.managerLs = new ManagerListener(this);
        this.mapWebsockets = new Map();
    }

    createSocket(path: string = '', websocket: Websocket): SocketIOClient.Socket {
        const res = this.mapWebsockets.get(path);

        if (res) return res.socket;

        const socket = this.manager.socket(path);
        this.mapWebsockets.set(path, websocket);

        return socket;
    }

    updateSocket(path: string = '', websocket: Websocket): SocketIOClient.Socket {
        const res = this.mapWebsockets.get(path);

        if (res) res.socket.disconnect();
        
        delete this.manager.nsps[path];

        const newSocket = this.manager.socket(path);
        this.mapWebsockets.set(path, websocket);

        return newSocket;
    }

    updateQuery(callback?: TypeCallback) {
        const newUserId = getPlayerId();
        const newAccessToken = getAccessToken();

        if (this.currentPlayerId !== newUserId || newAccessToken !== this.currentAccessToken) {
            this.currentPlayerId = newUserId;
            this.currentAccessToken = newAccessToken;
            
            this.manager = new Manager('', {
                ...CONFIG_WEBSOCKET_MANAGER,
                query: {
                    userId: getPlayerId(),
                    accessToken: getAccessToken(),
                }
            });

            this.reconnectAllSockets();

            runCallback(callback);
        }
    }

    getSocket(path: string): SocketIOClient.Socket | null {
        return this.mapWebsockets.get(path)?.socket || null;
    }

    getAllSockets(): Map<string, SocketIOClient.Socket> {
        const mapSocket: Map<string, SocketIOClient.Socket> = new Map();

        this.mapWebsockets.forEach((value, key) => {
            mapSocket.set(key, value.socket);
        })

        return mapSocket;
    }

    disconnectSocket(path: string, callback?: TypeCallback): void {
        const websocket = this.mapWebsockets.get(path);

        if (websocket) {
            websocket.socket.disconnect();
        }

        runCallback(callback);
    }

    disconnectAllSockets() {
        this.mapWebsockets.forEach(websocket => websocket.socket.disconnect());
    }

    reconnectSocket(path: string) {
        this.mapWebsockets.get(path)?._reconnect();
    }

    reconnectAllSockets() {
        this.mapWebsockets.forEach((value) => {
            value._reconnect();
        });
    }
}

class ManagerListener {
    private manager: ManagerCore;

    constructor(manager: ManagerCore) {
        this.manager = manager;

        this.initListenner();
    }

    private initListenner() {
        EventManager.on(LIST_EVENT.authChanged, this.handlePlayerChanged)
    }

    handlePlayerChanged = (): void => {
        this.manager.updateQuery(() => devModeConsole('log', 'Manager socket query updated'));
    }
}

const ManagerSc = new ManagerCore();

export const WebSocketManager = ManagerSc
