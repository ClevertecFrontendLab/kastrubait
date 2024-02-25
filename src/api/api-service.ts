import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import {
    IUpdateUserSlice,
    ICheckEmailSlice,
    IConfirmEmailSlice,
    IChangePassSlice,
} from '../interfaces/auth-user.ts';

const instance = axios.create({
    withCredentials: false,
    baseURL: 'https://marathon-api.clevertec.ru/',
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

    async checkEmail({ data }: ICheckEmailSlice) {
        return instance.post(`/auth/check-email`, { email: data.email }).then((response) => {
            return response.data;
        });
    },

    async confirmEmail({ data }: IConfirmEmailSlice) {
        return instance
            .post(`/auth/confirm-email`, { email: data.email, code: data.code })
            .then((response) => {
                return response.data;
            });
    },

    async changePassword({ data }: IChangePassSlice) {
        return instance
            .post(`/auth/change-password`, {
                password: data.password,
                confirmPassword: data.confirmPassword,
            })
            .then((response) => {
                return response.data;
            });
    },
};
