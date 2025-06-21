import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true
    }),
    AuthModule,
    UserModule,
    GatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
