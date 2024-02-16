export interface IAuthUser {
    email: string;
    password: string;
}

export interface IUpdateUserSlice {
    data: IAuthUser;
}
