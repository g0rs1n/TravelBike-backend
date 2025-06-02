import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from './dtos/register-user.dto';
import { Response } from 'express';
import { loginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register (
    @Body() registerDto: registerUserDto,
    @Res({passthrough: true}) res: Response
  ) {
    const token = await this.authService.register(registerDto)
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000
    })
    return {message: 'User registered successfully'}
  }

  @Post('login')
  async login (
    @Body() loginPayload: loginUserDto,
    @Res({passthrough: true}) res: Response
  ) {
    const token = await this.authService.validateUser(loginPayload)
    console.log(token)
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000
    })
    return {message: 'Login successful'}
  }

}
