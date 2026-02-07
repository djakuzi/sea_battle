import { EnumStatusBattle } from "../../../../layouts/Battle/types/battle.enum";
import { PayloadAction } from "@reduxjs/toolkit";

/** Установить статус битвы */
export const setStatusBattle = (state, action: PayloadAction<EnumStatusBattle>) => {
	state.battle.status = action.payload;
};