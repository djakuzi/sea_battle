
import { EnumResultBattle } from "@app-layouts/Battle/types/battle.enum";
import { PayloadAction } from "@reduxjs/toolkit";

/** Установить результат битвы */
export const setResultBattle = (state, action: PayloadAction<EnumResultBattle>) => {
	state.battle.winner = action.payload;
};