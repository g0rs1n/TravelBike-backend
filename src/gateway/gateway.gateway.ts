import { WebSocketGateway } from '@nestjs/websockets';
import { GatewayService } from './gateway.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class AppGateway {
  constructor(private readonly gatewayService: GatewayService) {}
}
