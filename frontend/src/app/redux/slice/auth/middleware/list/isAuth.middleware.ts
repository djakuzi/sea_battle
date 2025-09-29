import { saveStateLocalStorage } from "@app-common/script/utils/localStorage";
import { isValidActionType } from "@app-redux/helper/isValidActionType";
import { AppDispatch, RootState } from "@app-redux/store";
import { Middleware, MiddlewareAPI, PayloadAction } from "@reduxjs/toolkit";
import { KEY_IS_AUTH } from "../../auth.slice";

let previousAuth: boolean | undefined = undefined;

export const MiddlewareIsAuth: Middleware = (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    const result = next(action) as PayloadAction;
    const listType = ['auth/'];
    const isStateAuth = isValidActionType(result, 'startsWith', ...listType);
    const state = store.getState() as RootState;

    if (isStateAuth) {
        const isAuth = state.auth.isAuth;

        const resIsAuth = previousAuth !== isAuth;

        if (resIsAuth || typeof previousAuth === 'undefined') {
            previousAuth = isAuth;
            saveStateLocalStorage<boolean>(KEY_IS_AUTH, isAuth);
        }
    }

    return result;
};
