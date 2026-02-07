import { PayloadAction } from "@reduxjs/toolkit";
import { initialConnectStatusServer } from "../serverStatus.slice";

export function setPing(state: initialConnectStatusServer, actiion: PayloadAction<number>): void {
    state.ping = actiion.payload;
}