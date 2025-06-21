import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { AppGateway } from './gateway.gateway';

@Module({
  providers: [
    AppGateway, 
    GatewayService
  ],
})
export class GatewayModule {}
