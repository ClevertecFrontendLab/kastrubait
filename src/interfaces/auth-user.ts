import { ResultStatusType } from 'antd/lib/result';
import { ReactNode } from 'react';

export interface IAuthUser {
    email: string;
    password: string;
}

export interface IConfirmEmailSlice {
    data: {
        email: string;
        code: string;
    };
}

export interface IChangePassSlice {
    data: {
        password: string;
        confirmPassword: string;
    };
}

export interface ICheckEmailSlice {
    data: {
        email: string;
    };
}

export interface IUpdateUserSlice {
    data: IAuthUser;
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
