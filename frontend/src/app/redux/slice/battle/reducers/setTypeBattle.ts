import { TypeBattle } from "@app-layouts/Battle/types/battle";
import { PayloadAction } from "@reduxjs/toolkit";

   /** setTypeBattle - установить тип игры. */
export function setTypeBattle(state, action: PayloadAction<TypeBattle>) {
    state.battle.type = action.payload;
};