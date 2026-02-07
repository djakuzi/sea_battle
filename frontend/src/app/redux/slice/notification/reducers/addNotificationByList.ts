import { IntrNotification } from "@app-rootController/Visual-Interface/elements/Notification/interfaces/Notification";
import { PayloadAction } from "@reduxjs/toolkit";

/** Добавить уведомление в список */
export const addNotificationByList = (state, action: PayloadAction<IntrNotification>) => {
    const { ...notification } = action.payload;
    notification.id = state.list.length; // Новый id = длина списка
    state.list.push(notification);
};