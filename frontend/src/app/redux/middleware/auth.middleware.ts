import { Middleware, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';
import { saveStateLocalStorage } from '../../common/script/utils/localStorage';
import { KEY_IS_AUTH } from '../slice/auth/auth.slice';
import { AppDispatch, RootState } from '../store';

let previousAuth: boolean | undefined = undefined;

export const authMiddleware: Middleware = (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {

    const result = next(action) as PayloadAction;

    const state = store.getState() as RootState;
    const isAuth = state.auth.isAuth;

    const resIsAuth = previousAuth !== isAuth;

    if (resIsAuth || typeof previousAuth === 'undefined') {
        previousAuth = isAuth;
        saveStateLocalStorage<boolean>(KEY_IS_AUTH, isAuth);
    }

    return result;
};
