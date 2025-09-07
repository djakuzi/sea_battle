import { configureStore } from '@reduxjs/toolkit';
import reduserAuth from './slice/auth/auth.slice';
import reduserMainSliderScreen from './slice/menuSlider.slice';
import reduserAspectRatio from './slice/aspectRatio.slice';
import reduserBattle from './slice/battle.slice';
import reduserConstructor from './slice/constructor.slice';
import reduserNotification from './slice/notification.slice';
import reduserGameSettings from './slice/game-settings/gameSettings.slice';
import reduserStatusServer from './slice/status-server/statusConnectServer.slice';
import constructorMiddleware from './middleware/constructor.middleware';
import { errorHandlerMiddleware } from './middleware/errorHandler.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { middlewarMenuSlider } from './middleware/menuSlider.middleware';

const store = configureStore({
  reducer: {
    auth: reduserAuth,
    menuSlider: reduserMainSliderScreen,
    aspectRatio: reduserAspectRatio,
    battle: reduserBattle,
    constructorField: reduserConstructor,
    notification: reduserNotification,
    statusServer: reduserStatusServer,
    gameSettings: reduserGameSettings
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authMiddleware,
      constructorMiddleware,
      errorHandlerMiddleware,
      middlewarMenuSlider
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


