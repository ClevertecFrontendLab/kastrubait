import { ResultStatusType } from 'antd/lib/result';
import { ReactNode } from 'react';

export interface AuthResponse {
    token: string | null;
}

export interface IAuthUser {
    email: string;
    password: string;
}

export interface IConfirmEmailSlice {
    email: string;
    code: string;
}

export interface IChangePassSlice {
    password: string;
    confirmPassword: string;
}

export interface ICheckEmailSlice {
    email: string;
}

export interface IUpdateUserSlice {
    data: IAuthUser;
    rememberMe?: boolean | undefined;
}

export interface IErrorPayload {
    statusCode: number;
    error: string;
    message: string;
}

export interface IHeaderState {
    isAuthUser: boolean;
    userLogin: string | null;
    password: string | null;
    rememberMe: boolean;
    responseCode: number;
    status: string | null;
    error: IErrorPayload | null;


}

export interface ResultsInfo {
    statusCode: number | string;
    status: ResultStatusType;
    title: string | ReactNode;
    subtitle: string | ReactNode;
    button: string | ReactNode;
    redirect: string;
    testId: string;
}
