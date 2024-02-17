export interface IAuthUser {
    email: string;
    password: string;
}

export interface IConfirmEmailSlice {
    data: {
        email: string;
        code: string;
    }
}

export interface IChangePassSlice {
    data: {
        password: string;
        confirmPassword: string;
    }
}

export interface ICheckEmailSlice {
    data: {
        email: string;
    }
}

export interface IUpdateUserSlice {
    data: IAuthUser;
}
