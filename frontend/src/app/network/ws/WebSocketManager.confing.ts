import { isDevMode } from "@app-common/script/modules/Developer/methods/isDevMode";
import { ConfigWebsocketManager } from "./WebsocketManager.interface";

const resIsDevMode = isDevMode();

export const CONFIG_WEBSOCKET_MANAGER: ConfigWebsocketManager = {
    transports: ['websocket'],
    hostname: resIsDevMode ? 'localhost' : '',
    port: resIsDevMode ? '2468' : '',
    secure: !resIsDevMode,
    autoConnect: false,
    reconnectionAttempts: 0,
    reconnection: false,
};