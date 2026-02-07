import { IntrCoordPuttingShip } from "@app-common/types/Ship.interface";
import { PayloadAction } from "@reduxjs/toolkit";

/** arrCoordPuttingShip - установить текущие/последние данные поставленных кораблей */
export function setLastCoordsShips (state, action: PayloadAction<IntrCoordPuttingShip[]>) {
    state.lastCoordPuttingShip = [...action.payload];
}