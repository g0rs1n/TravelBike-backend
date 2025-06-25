import { IoAdapter } from "@nestjs/platform-socket.io";
import { UserService } from "src/user/user.service";
import { IJwtPayload, IAuthenticatedSocket } from "src/common/utils/types";
import * as jwt from 'jsonwebtoken'
import * as cookie from 'cookie'
import { INestApplication } from "@nestjs/common";

export class WebSocketAdapter extends IoAdapter {

    constructor (
        app: INestApplication,
        private readonly userService: UserService
    ) {
        super(app)
    }

    createIOServer(port: number, options?: any) {
        const server = super.createIOServer(port, options)
        server.use(async (socket: IAuthenticatedSocket, next) => {
            try {
                const cookieHeader = socket.handshake.headers.cookie
                if (!cookieHeader) {
                    return next(new Error('No cookies provided, authorization failed'))
                }

                const {access_token} = cookie.parse(cookieHeader)
                if (!access_token) {
                    return next(new Error('Unauthorized: access token is missing'))
                }

                const decodedToken = jwt.verify(access_token, process.env.JWT_SECRET!) as IJwtPayload
                if (!decodedToken || !decodedToken.sub) {
                    return next(new Error('Invalid token payload'))
                }

                const userId = Number(decodedToken.sub);
                if (isNaN(userId)) {
                    return next(new Error('Invalid user_id in token'));
                }

                const user = await this.userService.findById(userId)
                if (!user) {
                    return next(new Error('User not found'))
                }

                const {password:_, ...userData} = user
                
                socket.user = userData

                next()
                
            } catch (error) {
                console.error('SocketAdapter auth error:', error)
                next(new Error('Authentication wsAdapter error'))
            }
        })
        return server
    }
}