import { configureStore } from '@reduxjs/toolkit';
import reduserAuth from './slice/auth/auth.slice';
import reduserAspectRatio from './slice/aspect-ratio/aspectRatio.slice';
import reduserBattle from './slice/battle/battle.slice';
import reduserConstructor from './slice/constructor/constructor.slice';
import reduserNotification from './slice/notification/notification.slice';
import reduserGameSettings from './slice/game-settings/gameSettings.slice';
import reduserStatusServer from './slice/status-server/serverStatus.slice';
import constructorMiddleware from './middleware/constructor.middleware';
import { errorHandlerMiddleware } from './middleware/errorHandler.middleware';
import { ListAuthMiddleware } from './slice/auth/authMiddleware.list';

const store = configureStore({
  reducer: {
    auth: reduserAuth,
    aspectRatio: reduserAspectRatio,
    battle: reduserBattle,
    constructorField: reduserConstructor,
    notification: reduserNotification,
    statusServer: reduserStatusServer,
    gameSettings: reduserGameSettings
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ...ListAuthMiddleware,
      constructorMiddleware,
      errorHandlerMiddleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


