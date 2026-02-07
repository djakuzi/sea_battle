import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { saveStateLocalStorage } from '../../common/script/utils/localStorage';
import { IntrCoordPuttingShip } from '../../common/types/Ship.interface';
import { AppDispatch, RootState } from '@app-redux/store';
import { MiddlewareAPI } from '@reduxjs/toolkit/react';
import { isValidActionType } from '@app-redux/helper/isValidActionType';
import { KEY_LAST_COORDS_SHIPS, KEY_SAVE_COORDS_SHIPS } from '@app-redux/slice/constructor/constants/keyLocalStorage';

let previousState = {
  lastCoordPuttingShip: [] as IntrCoordPuttingShip[],
  listSaveCoordPuttingShip: [] as Array<IntrCoordPuttingShip[]>,
};

const constructorMiddleware: Middleware = (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
  const result = next(action) as PayloadAction;
  const listType = ['constructor/'];

  if (isValidActionType(result, 'startsWith', ...listType)) {
    const state = store.getState();
    const { lastCoordPuttingShip, listSaveCoordPuttingShip } = state.constructorField;

    const isLastCoordChanged = JSON.stringify(lastCoordPuttingShip) !== JSON.stringify(previousState.lastCoordPuttingShip);
    const isListSaveCoordChanged = JSON.stringify(listSaveCoordPuttingShip) !== JSON.stringify(previousState.listSaveCoordPuttingShip);

    if (isLastCoordChanged) {
      saveStateLocalStorage<IntrCoordPuttingShip[]>(KEY_LAST_COORDS_SHIPS, lastCoordPuttingShip);
    }

    if (isListSaveCoordChanged) {
      saveStateLocalStorage<Array<IntrCoordPuttingShip[]>>(KEY_SAVE_COORDS_SHIPS, listSaveCoordPuttingShip);
    }

    previousState = {
      lastCoordPuttingShip,
      listSaveCoordPuttingShip,
    };
  }

  return result;
};

export default constructorMiddleware;
