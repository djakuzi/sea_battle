import { PayloadAction } from "@reduxjs/toolkit";

/** removeItemCoordByList - удалить одну расставновку кораблей */
export function removeItemCoordByList (state, action: PayloadAction<number>) {
    const index: number = action.payload;
    state.listSaveCoordPuttingShip = state.listSaveCoordPuttingShip.filter((_, i) => i !== index);
}