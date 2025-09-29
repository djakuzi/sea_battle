import { IntrTimerBattle } from "@app-layouts/Battle/type/Battle.interface";
import { PayloadAction } from "@reduxjs/toolkit";

/** Обновить таймер */
export const updateTimer = (state, action: PayloadAction<IntrTimerBattle>) => {
    state.battle.timer = action.payload;
};