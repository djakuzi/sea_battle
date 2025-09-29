import { IntrCoordPuttingShip } from "@app-common/types/Ship.interface";
import { PayloadAction } from "@reduxjs/toolkit";

/** addItemCoordByList - добавить расставновку кораблей */
export function addItemCoordByList(state, action: PayloadAction<IntrCoordPuttingShip[]>) {
    state.listSaveCoordPuttingShip.push([...action.payload]);
}