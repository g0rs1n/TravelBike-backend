import { Socket } from "socket.io";

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
    id: number;
    email: string;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    avatarPath?: string | null;
}

export type TPayloadJwtAccesToken = {
    sub: number;
}

export interface IJwtPayload {
    sub: number | string
}

export interface IAuthenticatedSocket extends Socket {
  user: IUserBase;
}