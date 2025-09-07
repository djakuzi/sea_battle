import { isDevMode } from "@app-common/script/modules/Developer/methods/isDevMode";
import { ConfigWebsocket } from "./types/websocket.interface";

const resIsDevMode = isDevMode();

export const CONFIG_WEBSOCKET: ConfigWebsocket | SocketIOClient.ConnectOpts = {
    transports: ['websocket'],
    hostname: resIsDevMode ? 'localhost' : '',
    port: resIsDevMode ? '2468' : '',
    secure: !resIsDevMode,
    reconnectionAttempts: 5,
};