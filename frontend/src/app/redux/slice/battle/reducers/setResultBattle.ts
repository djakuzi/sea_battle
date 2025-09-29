import { TypeResultBattle } from "@app-layouts/Battle/types/battle";
import { PayloadAction } from "@reduxjs/toolkit";

/** Установить результат битвы */
export const setResultBattle = (state, action: PayloadAction<TypeResultBattle>) => {
    state.battle.winner = action.payload;
};