import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password/password.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService : ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {expiresIn: "1d"}
      }),
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService, 
    PasswordService, 
    PrismaService,
    JwtStrategy
  ],
})
export class AuthModule {}
