import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from './dto/register-user.dto';
import { Response } from 'express';

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
      maxAge: 24 * 60 * 60 * 1000
    })
    return {message: 'User registered successfully'}
  }

}
