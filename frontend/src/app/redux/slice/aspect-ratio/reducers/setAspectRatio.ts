import { PayloadAction } from "@reduxjs/toolkit";
import { TypeAspectRatio } from "../aspectRatio.slice";

/** Установить aspect ratio */
export const setAspectRatio = (state, action: PayloadAction<TypeAspectRatio>) => {
    state.aspectRatio = action.payload;
    state.error = undefined; // Сбрасываем ошибку при успешной установке
};