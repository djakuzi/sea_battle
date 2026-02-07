import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntrCoordPuttingShip } from '../../../common/types/Ship.interface';
import { loadStateLocalStorage } from '../../../common/script/utils/localStorage';
import { setLastCoordsShips } from './reducers/setLastCoordsShips';
import { resetLastCoordsShips } from './reducers/resetLastCoordsShips';
import { removeItemCoordByList } from './reducers/removeItemCoordByList';
import { addItemCoordByList } from './reducers/addItemCoordByList';
import { clearListCoord } from './reducers/clearListCoord';
import { KEY_LAST_COORDS_SHIPS, KEY_SAVE_COORDS_SHIPS } from './constants/keyLocalStorage';

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
    setLastCoordsShips,
    resetLastCoordsShips,
    removeItemCoordByList,
    addItemCoordByList,
    clearListCoord,
  },
});

export const actionsConstructor = sliceConstructor.actions;
export default sliceConstructor.reducer;
