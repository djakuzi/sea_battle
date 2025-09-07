import { PayloadAction } from "@reduxjs/toolkit";
import { initialStateAuth } from "../auth.slice";

export function updateToken(state: initialStateAuth, action: PayloadAction<string>):void {
    state.accessToken = action.payload;
}