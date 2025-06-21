import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { AppGateway } from './gateway';
import { GatewaySessionManager } from './gateway.session';

@Module({
  providers: [
    AppGateway, 
    GatewayService,
    GatewaySessionManager
  ],
})
export class GatewayModule {}
