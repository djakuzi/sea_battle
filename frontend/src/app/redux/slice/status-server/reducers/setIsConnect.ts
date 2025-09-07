import { initialConnectStatusServer } from "../statusConnectServer.slice";


export function setIsConnect(state: initialConnectStatusServer): void {
    if (!state.isConnect) {
        state.isConnection = false;
        state.isConnect = true;
        state.isDisconnect = false;
    }
}