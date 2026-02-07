import { PayloadAction } from "@reduxjs/toolkit/react";

/** Установить ошибку */
export const setError = (state, action: PayloadAction<string | ''>) => {
    state.battle.error = action.payload;
};