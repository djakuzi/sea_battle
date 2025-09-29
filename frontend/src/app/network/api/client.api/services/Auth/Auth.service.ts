
import { IntrRegister } from "./types/Register.interface";
import axios from 'axios';
import { IntrSignIn } from "./types/SignIn.interface";
import { ResponseAuth, ResponseSignOut, ResponseVerificationUser } from "./types/Response.interface";
import ApiClientService from "../../ApiClient.service";
import { isAxiosError } from "@app-common/script/utils/error/method/isAxiosError";

class AuthCore extends ApiClientService {

    constructor(nameController: string) {
        super(nameController);

        this.endPoints = {
            meVerification : `/${nameController}/me-verification`,
            signIn: `/${nameController}/sign-in`,
            signOut: `/${nameController}/sign-out`,
            register: `/${nameController}/register`,
            refresh: `/${nameController}/refresh`,
        };
    }

    async getMeVerification(): Promise<ResponseVerificationUser[]> {
        try {
            const response = await this.apiClient.get<ResponseVerificationUser[]>(this.endPoints.meVerification,
                {
                    headers: {
                        Authorization: true
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(isAxiosError(error, 'Неизвестная ошибка'));
        }
    }

    async signIn(data: IntrSignIn): Promise<ResponseAuth> {
        try {
            const response = await this.apiClient.post<ResponseAuth>(this.endPoints.signIn, data);
            return response.data;
        } catch (error) {
            throw new Error(isAxiosError(error, 'Неизвестная ошибка входа'));
        }
    }

    async register(data: IntrRegister): Promise<ResponseAuth> {
        try {
            const response = await this.apiClient.post<ResponseAuth>(this.endPoints.register, data);

            return response.data;
        } catch (error) {
            throw new Error(isAxiosError(error, 'Неизвестная ошибка регистрации'));
        }
    }

    async refreshToken(): Promise<ResponseAuth> {
        try {
            const response = await this.apiClient.post<ResponseAuth>(this.endPoints.refresh);

            return response.data;
        } catch (error) {
            throw new Error(isAxiosError(error, 'Неизвестная ошибка'));
        }
    }

    async signOut(): Promise<ResponseSignOut> {
        try {
            const response = await this.apiClient.post<ResponseSignOut>(this.endPoints.signOut);
            return response.data;
        } catch (error) {
            throw new Error(isAxiosError(error, 'Неизвестная ошибка выхода'));
        }
    }
}

export const AuthService = new AuthCore('auth');