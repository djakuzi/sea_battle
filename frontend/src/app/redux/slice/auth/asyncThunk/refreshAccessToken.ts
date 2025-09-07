import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseRefresh } from "../../../../network/api/client.api/services/Auth/types/Response.interface";
import { AuthService } from "../../../../network/api/client.api/services/Auth/Auth.service";

export const refreshAccessTokenThunk = createAsyncThunk<
    ResponseRefresh,
    void,
    { rejectValue: string }
>(
    'auth/refreshAccessToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.refreshToken();
            return response;
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message);
            return rejectWithValue('Неизвестная ошибка при обновлении токена');
        }
    }
);