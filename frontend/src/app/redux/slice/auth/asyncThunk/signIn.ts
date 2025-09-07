import { createAsyncThunk } from "@reduxjs/toolkit";
import { IntrSignIn } from "../../../../network/api/client.api/services/Auth/types/SignIn.interface";
import { AuthService } from "../../../../network/api/client.api/services/Auth/Auth.service";


// Thunk для входа
export const signInThunk = createAsyncThunk(
    'auth/signIn',
    async (data: IntrSignIn, { rejectWithValue }) => {
        try {
            const response = await AuthService.signIn(data);
            
            return response;
        } catch (err) {
            if (err instanceof Error) return rejectWithValue(err.message);
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);