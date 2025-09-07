import { Middleware, Dispatch } from '@reduxjs/toolkit';
import { KEY_LAST_COORDS_SHIPS, KEY_SAVE_COORDS_SHIPS } from '../slice/constructor.slice'; // Импортируем константы
import { saveStateLocalStorage } from '../../common/script/utils/localStorage';
import { IntrCoordPuttingShip } from '../../common/types/Ship.interface';
import { AppDispatch, RootState } from '@app-redux/store';
import { MiddlewareAPI } from '@reduxjs/toolkit/react';

let previousState = {
  lastCoordPuttingShip: [] as IntrCoordPuttingShip[],
  listSaveCoordPuttingShip: [] as Array<IntrCoordPuttingShip[]>,
};

// Правильная типизация для middleware
const constructorMiddleware: Middleware = (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
  const result = next(action); // передаем действие в следующий middleware

  // Получаем состояние из хранилища
  const state = store.getState();
  const { lastCoordPuttingShip, listSaveCoordPuttingShip } = state.constructorField;

  // Сравниваем текущее состояние с предыдущим
  const isLastCoordChanged = JSON.stringify(lastCoordPuttingShip) !== JSON.stringify(previousState.lastCoordPuttingShip);
  const isListSaveCoordChanged = JSON.stringify(listSaveCoordPuttingShip) !== JSON.stringify(previousState.listSaveCoordPuttingShip);

  // Если есть изменения, сохраняем их в localStorage
  if (isLastCoordChanged) {
    saveStateLocalStorage<IntrCoordPuttingShip[]>(KEY_LAST_COORDS_SHIPS, lastCoordPuttingShip);
  }

  if (isListSaveCoordChanged) {
    saveStateLocalStorage<Array<IntrCoordPuttingShip[]>>(KEY_SAVE_COORDS_SHIPS, listSaveCoordPuttingShip);
  }

  // Обновляем предыдущее состояние
  previousState = {
    lastCoordPuttingShip,
    listSaveCoordPuttingShip,
  };

  return result; // возвращаем результат работы middleware
};

export default constructorMiddleware;

