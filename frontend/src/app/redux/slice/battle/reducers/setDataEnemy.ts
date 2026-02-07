import { IntrInfoEnemy } from "@app-layouts/Battle/type/Battle.interface";
import { PayloadAction } from "@reduxjs/toolkit";

export function setDataEnemy (state, action: PayloadAction<IntrInfoEnemy>) {
    state.enemy = action.payload;
}