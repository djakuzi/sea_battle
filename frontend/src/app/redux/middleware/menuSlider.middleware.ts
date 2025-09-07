import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { KEY_NAME_SCREEN_MENU } from '../slice/menuSlider.slice';
import { AppDispatch, RootState } from '@app-redux/store';

interface IntrPreviousState {
    nameScreen: string | null;
}

let previousState: IntrPreviousState = {
    nameScreen: null
};

export const middlewarMenuSlider: Middleware = (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    const result = next(action);

    // const state = store.getState();
    // const { nameScreen } = state.menuSlider;

    // const isDifferent = nameScreen !== previousState.nameScreen;

    // if (isDifferent && nameScreen) {
    //     sessionStorage.setItem(KEY_NAME_SCREEN_MENU, nameScreen);
    // }

    // previousState = {
    //     nameScreen,
    // };

    return result;
};