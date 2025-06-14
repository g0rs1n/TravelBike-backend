
export interface IRegisterData {
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    password: string;
    phone?: string;
    avatarPath?: string;
}

export interface ILoginData {
    username?: string;
    email: string;
    password: string;
}

export interface IUserBase {
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatarPath?: string;
}

export type TPayloadJwtAccesToken = {
    sub: number;
}