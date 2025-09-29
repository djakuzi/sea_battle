import { LIST_EVENT } from "@app-core/data/event/listNameEvents";
import EventManager from "@app-event/EventManager";
import { isValidActionType } from "@app-redux/helper/isValidActionType";
import { AppDispatch, RootState } from "@app-redux/store";
import { Middleware, MiddlewareAPI, PayloadAction } from "@reduxjs/toolkit";

let previousPlayerId: number | undefined = undefined;
let previousPlayerAcces: string | null = null;

export const MiddlewareAuthChanged: Middleware = (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    const result = next(action) as PayloadAction;
    const listType = ['auth/'];
    const isStateAuth = isValidActionType(result, 'startsWith', ...listType);

    if (!isStateAuth) return;

    const state = store.getState() as RootState;

    const isChange = state.auth?.accessToken !== previousPlayerAcces || state.auth.player?.id !== previousPlayerId;

    if (isChange) {
        EventManager.emit(LIST_EVENT.authChanged, {
            playerId: state.auth.player?.id,
            accesToken: state.auth?.accessToken ? state.auth?.accessToken : undefined,
        })

        previousPlayerId = state.auth.player?.id;
        previousPlayerAcces = state.auth?.accessToken;
    }

    return result;
};
