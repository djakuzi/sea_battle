import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EnumScreenName } from "../../core/data/list-component/interfaces/screenMenu.interface";

export const KEY_NAME_SCREEN_MENU = 'nameScreenMenu';

export interface initialState {
  nameScreen: EnumScreenName;
}

const initialState: initialState = {
  nameScreen: (sessionStorage.getItem(KEY_NAME_SCREEN_MENU) as EnumScreenName) ?? EnumScreenName.Menu
};

const sliceMainSliderScreen = createSlice({
  name: 'menuSlider',
  initialState,
  reducers: {
    changeScreen: (state, action: PayloadAction<EnumScreenName>) => {
      state.nameScreen = action.payload;
    },
  },
});

export const actionsMainSliderScreen = sliceMainSliderScreen.actions;
export default sliceMainSliderScreen.reducer;