import { TypeStatusBattle } from "../../../../layouts/Battle/types/battle.enum";
import { PayloadAction } from "@reduxjs/toolkit";

/** Установить статус битвы */
export const setStatusBattle = (state, action: PayloadAction<TypeStatusBattle>) => {
	state.battle.status = action.payload;
};