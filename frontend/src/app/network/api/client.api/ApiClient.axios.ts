import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getBaseURL } from "./script/getBaseURL";
import store, { AppDispatch } from "../../../redux/store";
import { isDevMode } from "@app-common/script/modules/Developer/methods/isDevMode";
import { refreshAccessTokenThunk } from "@app-redux/slice/auth/asyncThunk/refreshAccessToken";

const resIsDevMode = isDevMode();

export const apiClient: AxiosInstance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const accessToken = state.auth.accessToken;

        if (config.headers['Authorization'] && accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        if (resIsDevMode) {
            console.log(config);
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (resIsDevMode) {
            console.log(response);
        }
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig;
        const state = store.getState();
        const { isRefreshingFailed, isRefreshing } = state.auth;

        if (error.response?.status === 401) {
            if (isRefreshingFailed || isRefreshing) {
                return Promise.reject(error);
            }

            const dispatch: AppDispatch = store.dispatch;

            try {
                await dispatch(refreshAccessTokenThunk());

                const newAccessToken = store.getState().auth.accessToken;

                if (!originalRequest.headers) {
                    originalRequest.headers = {};
                }

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return apiClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);