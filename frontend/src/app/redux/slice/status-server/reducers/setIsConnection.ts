import { initialConnectStatusServer } from "../statusConnectServer.slice";

export function setIsConnection(state: initialConnectStatusServer): void {
    if (!state.isConnection) {
        state.isConnection = true;
        state.isConnect = false;
        state.isDisconnect = false;
    }
}