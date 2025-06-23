import { 
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { GatewaySessionManager } from './gateway.session';
import { Server } from 'socket.io';
import { GatewayService } from './gateway.service';
import { IAuthenticatedSocket } from 'src/common/utils/types';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly gatewayService: GatewayService,
    readonly sessions: GatewaySessionManager
  ) {}

  @WebSocketServer()
  server: Server

  handleConnection(socket: IAuthenticatedSocket, ...args: any[]) {
    if (socket.user && socket.user.id !== undefined) {
      console.log(`User connected: id=${socket.user.id}, username=${socket.user.username}`)
      this.sessions.setUserSocket(socket.user.id, socket)
      socket.emit("connected",{
        message: `Welcome, ${socket.user.username}!`
      })
    } else {
      console.error("Unauthorized: user data missing");
      socket.emit("exception", {
        message: "Unauthorized: user data missing"
      })
      socket.disconnect(true)
    }
  }

  handleDisconnect(socket: IAuthenticatedSocket) {
    if (socket.user && socket.user.id !== undefined) {
      console.log(`User disconnected: id=${socket.user.id}, username=${socket.user.username}`)
      this.sessions.deleteUserSocket(socket.user.id)
    } else {
      console.error("Unauthorized disconnect attempt: user info missing in socket")
    }
  }
  
}
