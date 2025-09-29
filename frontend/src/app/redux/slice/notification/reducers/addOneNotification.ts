import { IntrNotification } from "@app-rootController/Visual-Interface/elements/Notification/interfaces/Notification";
import { PayloadAction } from "@reduxjs/toolkit/react";

export const addOneNotification = (state, action: PayloadAction<IntrNotification>) => {
    const { ...notification } = action.payload;
    notification.id = -1; // Можно поменять логику создания id, если нужно
    state.oneNotification = notification;
};
