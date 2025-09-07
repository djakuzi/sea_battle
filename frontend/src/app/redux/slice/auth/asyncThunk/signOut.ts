import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../../../network/api/client.api/services/Auth/Auth.service";

export const signOutThunk = createAsyncThunk(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.signOut();
            return response;
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message);
            return rejectWithValue('Неизвестная ошибка выхода из аккаунта');
        }
    },
);
