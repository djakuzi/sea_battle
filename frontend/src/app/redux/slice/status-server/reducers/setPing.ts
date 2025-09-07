import { PayloadAction } from "@reduxjs/toolkit";
import { initialConnectStatusServer } from "../statusConnectServer.slice";

export function setPing(state: initialConnectStatusServer, actiion: PayloadAction<number>): void {
    state.ping = actiion.payload;
}