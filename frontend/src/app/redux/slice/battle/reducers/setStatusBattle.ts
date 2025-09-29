import { TypeStatusBattle } from "@app-layouts/Battle/types/battle";
import { PayloadAction } from "@reduxjs/toolkit";

/** Установить статус битвы */
export const setStatusBattle = (state, action: PayloadAction<TypeStatusBattle>) => {
    state.battle.status = action.payload;
};