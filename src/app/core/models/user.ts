export interface User {
    _id?: number;
    username: string;
    password?: string;
    name: string;
    surname: string;
    email: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword?: string;
}

export interface IUserView {
    _id?: string;
    name: string;
    email: string;
    username: string;
}