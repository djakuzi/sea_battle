import { IntrUpdatingCountRemainingShip } from "@app-layouts/Battle/type/Battle.interface";
import { PayloadAction } from "@reduxjs/toolkit";

/** Обновить счетчик оставшихся кораблей */
export const updateCountRemainingShip = (state, action: PayloadAction<IntrUpdatingCountRemainingShip>) => {
    const { typePlayers, countRemainingShip } = action.payload;
    state[typePlayers]!.countRemainingShip = countRemainingShip;
};