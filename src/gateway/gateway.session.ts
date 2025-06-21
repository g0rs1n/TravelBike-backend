import { Injectable } from "@nestjs/common";
import { IAuthenticatedSocket } from "src/common/utils/types";

type ISession = Map<number, IAuthenticatedSocket>

export interface IGatewaySessionManager {
    getUserSocket(userId: number): IAuthenticatedSocket | undefined;
    setUserSocket(userId: number, socket: IAuthenticatedSocket): void;
    deleteUserSocket(userId: number): void;
    getSockets(): ISession;
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
    private readonly session: ISession = new Map()

    getUserSocket (userId: number) {
        return this.session.get(userId)
    }

    setUserSocket (userId: number, socket: IAuthenticatedSocket) {
        return this.session.set(userId, socket)
    }

    deleteUserSocket (userId: number) {
        return this.session.delete(userId)
    }

    getSockets (): ISession {
        return this.session
    }

}