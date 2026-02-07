import axios from "axios";

export function isAxiosError(error: unknown, mes = 'Неизвестная ошибка') {
    let errorMessage = 'Неизвестная ошибка входа';

    if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 'Неизвестная ошибка входа';
    }

    return errorMessage;
}