import { PayloadAction } from "@reduxjs/toolkit";

/** Удалить уведомление из списка по id */
export const deleteNotificationByList = (state, action: PayloadAction<number>) => {
    state.list = state.list.filter((el) => el.id !== action.payload);
};