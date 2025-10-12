import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { WebSocketManager } from "./WebSocketManager";
import { TypeCallback } from "@app-common/types/typeCallback.type";
import { isErrorWithConsole } from "../../common/script/utils/error/method/isErrorWithConsole";
import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";

interface IntrConfigWebsocket {
    autoConnect: boolean;
}

interface IntrStateWebsocket {
    isConnect: boolean;
    isFirstConnect: boolean;
    isReconnect: boolean;
}

class Websocket {
    readonly path: string;
    protected mapEventListeners: Map<string, Set<TypeCallback>> = new Map();
    protected mapEventListenersOnce: Map<string, TypeCallback> = new Map();
    state: IntrStateWebsocket;
    config: IntrConfigWebsocket
    socket: SocketIOClient.Socket;

    constructor(
        path: string = ''
    ) {
        this.socket = WebSocketManager.createSocket(path, this);
        this.path = path;

        this.config = {
            autoConnect: false,
        }

        this.state = {
            isConnect: false,
            isReconnect: false,
            isFirstConnect: true,
        }
    }

    _connect(callback?: TypeCallback): void {
        try {
            if (this.socket.connected) {
                devModeConsole('warn', 'Such socket is already connected. Path: ' + this.path);
            }

            this.socket.connect();
            this.state.isConnect = true;

            runCallback(callback);

            this.state.isFirstConnect = false;
        } catch (error) {
            isErrorWithConsole(error);
        }
    };

    _disconnect(callback?: TypeCallback): void {
        try {
            this.socket.disconnect();
            this.state.isConnect = false;
            
            runCallback(callback);
        } catch (error) {
            isErrorWithConsole(error);
        }
    };

    _reconnect(callback?: TypeCallback): void {
        try {
            if (this.state.isReconnect) return;
            this.state.isReconnect = true;

            this.socket = WebSocketManager.updateSocket(this.path, this);

            if (this.state.isConnect) {
                this.restoreEventListeners();
                this.socket.connect();
            }

            runCallback(callback);

            this.state.isReconnect = false;
        } catch (error) {
            isErrorWithConsole(error);
        }
    }

    protected restoreEventListeners(): void {
        if (!this.state.isConnect) return;

        this.mapEventListeners.forEach((callbacks, event) => {
            this.socket.off(event);

            callbacks.forEach(callback => {
                this.socket.on(event, callback);
            });
        });

        this.mapEventListenersOnce.forEach((callback, event) => {
            this.socket.once(event, callback);
        });
    }

    _onceSubscribe<Args extends any[] = []>(
		event: string, 
		callback: TypeCallback<void, Args>
	): void {
        this.socket.once(event, callback);
        this.mapEventListenersOnce.set(event, callback);
    }

    _onSubscribe<Args extends any[] = []>(
        event: string,
        callback: TypeCallback<void, Args>
    ): void {
        if (!this.mapEventListeners.has(event)) {
            this.mapEventListeners.set(event, new Set());
        }

        const callbacks = this.mapEventListeners.get(event)!;

        if (!callbacks.has(callback)) {
            callbacks.add(callback);
            this.socket.on(event, callback);
        }
    }

    _unSubscribe(event: string, callback?: TypeCallback): void {
        const callbacks = this.mapEventListeners.get(event);

        if (!callbacks) return;

        if (callback) {
            callbacks.delete(callback);
            this.socket.off(event, callback);
            if (callbacks.size === 0) {
                this.mapEventListeners.delete(event);
            }
        } else {
            callbacks.forEach(cb => this.socket.off(event, cb));
            this.mapEventListeners.delete(event);
        }
    }

    _emit<D>(event: string, data?: D): void {
        this.socket.emit(event, data);
    }
}

export default Websocket;
