import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntrCoordPuttingShip } from '../../common/types/Ship.interface';
import { loadStateLocalStorage } from '../../common/script/utils/localStorage';

export const KEY_LAST_COORDS_SHIPS = 'last-coords-ships';
export const KEY_SAVE_COORDS_SHIPS = 'save-coords-ships';

export interface initialState {
  lastCoordPuttingShip: IntrCoordPuttingShip[];
  listSaveCoordPuttingShip: Array<IntrCoordPuttingShip[]>;
}

const initialState: initialState = {
  lastCoordPuttingShip: loadStateLocalStorage<IntrCoordPuttingShip[]>(KEY_LAST_COORDS_SHIPS) || [],
  listSaveCoordPuttingShip: loadStateLocalStorage<Array<IntrCoordPuttingShip[]>>(KEY_SAVE_COORDS_SHIPS) || [],
};

const sliceConstructor = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    /** arrCoordPuttingShip - установить текущие/последние данные поставленных кораблей */
    setLastCoordsShips: (state, action: PayloadAction<IntrCoordPuttingShip[]>) => {
      state.lastCoordPuttingShip = [...action.payload];
    },
    /** resetLastCoordsShips - удалить текущие/последние данные поставленных кораблей */
    resetLastCoordsShips: (state) => {
      state.lastCoordPuttingShip = [];
    },
    /** removeItemCoordByList - удалить одну расставновку кораблей */
    removeItemCoordByList: (state, action: PayloadAction<number>) => {
      const index: number = action.payload;
      state.listSaveCoordPuttingShip = state.listSaveCoordPuttingShip.filter((_, i) => i !== index);
    },
    /** addItemCoordByList - добавить расставновку кораблей */
    addItemCoordByList: (state, action: PayloadAction<IntrCoordPuttingShip[]>) => {
      state.listSaveCoordPuttingShip.push([...action.payload]);
    },
    /** clearListCoord - удалить все расставновки кораблей */
    clearListCoord: (state) => {
      state.listSaveCoordPuttingShip = [];
    },
  },
});

export const actionsConstructor = sliceConstructor.actions;
export default sliceConstructor.reducer;
