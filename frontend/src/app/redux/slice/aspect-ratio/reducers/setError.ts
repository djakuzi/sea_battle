import { PayloadAction } from "@reduxjs/toolkit/react";

/** Установить ошибку */
export const setError = (state, action: PayloadAction<string>) => {
    state.error = action.payload; // Устанавливаем ошибку
    state.aspectRatio = undefined; // Можно очистить aspectRatio при ошибке, если нужно
};