import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { IUpdateUserSlice } from '../interfaces/auth-user.ts'

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
        return instance
            .post(`/auth/google`, {})
            .then((response) => {
                return response.data;
            });
    },

    async authorization({data}: IUpdateUserSlice) {
        return instance
            .post(`/auth/login`, {email: data.email, password: data.password})
            .then((response) => {
                return response.data;
            });
    },

    async registration({data}: IUpdateUserSlice) {
        return instance
            .post(`/auth/registration`, {email: data.email, password: data.password})
            .then((response) => {
                return response.data;
            });
    },
}
