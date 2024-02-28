import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import {
    IUpdateUserSlice,
    ICheckEmailSlice,
    IConfirmEmailSlice,
    IChangePassSlice,
} from '../interfaces/auth-user.ts';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://marathon-api.clevertec.ru/',
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (!config) {
        config = {} as InternalAxiosRequestConfig;
    }
    if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export const ApiService = {
    //Reg & Auth
    async authGoogle() {
        return instance.get(`/auth/google`, {}).then((response) => {
            return response.data;
        });
    },

    async authorization({ data }: IUpdateUserSlice) {
        return instance
            .post(`/auth/login`, { email: data.email, password: data.password })
            .then((response) => {
                return response.data;
            });
    },

    async registration({ data }: IUpdateUserSlice) {
        return instance
            .post(`/auth/registration`, { email: data.email, password: data.password })
            .then((response) => {
                return response.data;
            });
    },

    async checkEmail(params: ICheckEmailSlice) {
        return instance.post(`/auth/check-email`, params).then((response) => {
            return response.data;
        });
    },

    async confirmEmail(params: IConfirmEmailSlice) {
        return instance
            .post(`/auth/confirm-email`, params)
            .then((response) => {
                return response.data;
            });
    },

    async changePassword(params: IChangePassSlice) {
        return instance
            .post(`/auth/change-password`,  params)
            .then((response) => {
                return response.data;
            });
    },
};
