import { PayloadAction } from "@reduxjs/toolkit";
import { IntrStatusConnectionServer } from "../../../../core/settings/types/gameSettings.interface";
import { initialStateSettings } from "../gameSettings.slice";

export function changeSettingsStatusConnectionServer(state: initialStateSettings, action: PayloadAction<IntrStatusConnectionServer>):void {
    state.statusConnectionServer = { ...action.payload};
}