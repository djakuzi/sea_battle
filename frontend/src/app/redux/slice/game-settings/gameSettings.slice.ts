import { createSlice } from '@reduxjs/toolkit';
import { IntrAnimationUi, IntrGameSettings, IntrStatusConnectionServer } from '../../../core/settings/types/gameSettings.interface';
import { animationUi, statusConnectionServer } from '../../../core/settings/gameSettings.settings';
import { loadStateLocalStorage } from '../../../common/script/utils/localStorage';
import { KEY_ANIMATION_UI, KEY_STATUS_CONNECTION_SERVER } from './constants/keyLocalStorage';
import { changeSettingsStatusConnectionServer } from './reducers/changeSettingsStatusConnectionServer';

export interface initialStateSettings extends IntrGameSettings { }

const initialState: initialStateSettings = {
  statusConnectionServer: loadStateLocalStorage<IntrStatusConnectionServer>(KEY_STATUS_CONNECTION_SERVER) ?? statusConnectionServer,
  animationUi: loadStateLocalStorage<IntrAnimationUi>(KEY_ANIMATION_UI) ?? animationUi,
};

const sliceSettings = createSlice({
  name: 'game-settings',
  initialState,
  reducers: {
    changeSettingsStatusConnectionServer,
  },
});

export const actionsSettings = sliceSettings.actions;
export default sliceSettings.reducer;
