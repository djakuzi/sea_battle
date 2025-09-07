
import { IntrRegister } from "./types/Register.interface";
import axios from 'axios';
import { IntrSignIn } from "./types/SignIn.interface";
import { ResponseAuth, ResponseSignOut } from "./types/Response.interface";
import ApiClientService from "../../ApiClient.service";

class AuthCore extends ApiClientService {

    constructor(nameController: string) {
        super(nameController);

        this.endPoints = {
            signIn: `/${nameController}/sign-in`,
            signOut: `/${nameController}/sign-out`,
            register: `/${nameController}/register`,
            refresh: `/${nameController}/refresh`,
        };
    }

    async signIn(data: IntrSignIn): Promise<ResponseAuth> {
        try {
            const response = await this.apiClient.post<ResponseAuth>(this.endPoints.signIn, data);
            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка входа';
            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка входа';
            }
            throw new Error(errorMessage);
        }
    }

    async register(data: IntrRegister): Promise<ResponseAuth> {
        try {
            const response = await this.apiClient.post<ResponseAuth>(this.endPoints.register, data);

            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка регистрации';
            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка регистрации';
            }
            throw new Error(errorMessage);
        }
    }

    async refreshToken(): Promise<ResponseAuth> {
        try {
            const response = await this.apiClient.post<ResponseAuth>(this.endPoints.refresh);

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorMessage = e.response?.data?.message || 'Вы не авторизованы';
                throw new Error(errorMessage);
            }
            throw new Error('Неизвестная ошибка');
        }
    }

    async signOut(): Promise<ResponseSignOut> {
        try {
            const response = await this.apiClient.post<ResponseSignOut>(this.endPoints.signOut);
            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка входа';
            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка входа';
            }
            throw new Error(errorMessage);
        }
    }
}

export const AuthService = new AuthCore('auth');