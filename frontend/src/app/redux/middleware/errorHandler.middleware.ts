import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import notification from '../../root-controller/Visual-Interface/elements/Notification/modules/notification';
import { AppDispatch, RootState } from '@app-redux/store';

export const errorHandlerMiddleware: Middleware = (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const message = typeof action.payload === 'string' ? action.payload : 'Произошла неизвестная ошибка';

        notification.createOneNotificftion('error', message, false, 1500);
    }

    return next(action);
};
