import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "../../../../root-controller/Visual-Interface/elements/Notification/modules/notification";
import { AuthService } from "../../../../network/api/client.api/services/Auth/Auth.service";
import { IntrRegister } from "../../../../network/api/client.api/services/Auth/types/Register.interface";

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (data: IntrRegister, { rejectWithValue }) => {
        try {
            const response = await AuthService.register(data);
            notification.createOneNotificftion('notification', 'Регистрация прошла успешно', false, 1500);
            return response;
        } catch (err) {
            if (err instanceof Error) return rejectWithValue(err.message);
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);
