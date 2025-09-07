import { initialConnectStatusServer } from "../statusConnectServer.slice";

export function setIsDisconnect(state: initialConnectStatusServer): void {
    if (!state.isDisconnect) {
        state.isConnection = false;
        state.isConnect = false;
        state.isDisconnect = true;
    }
}