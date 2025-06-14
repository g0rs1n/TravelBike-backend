import { 
  Body, 
  Controller, 
  Get, 
  HttpCode, 
  Post, 
  Req, 
  Res, 
  UsePipes
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from './dtos/register-user.dto';
import { Response, Request } from 'express';
import { loginUserDto } from './dtos/login-user.dto';
import { SanitizePipe } from 'src/common/pipes/sanitize/sanitize.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  @UsePipes(SanitizePipe)
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

  @HttpCode(200)
  @Post('login')
  @UsePipes(SanitizePipe)
  async login (
    @Body() loginPayload: loginUserDto,
    @Res({passthrough: true}) res: Response
  ) {
    const token = await this.authService.validateUser(loginPayload)
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000
    })
    return {message: 'Login successful'}
  }

  @HttpCode(200)
  @Get('verify')
  @UsePipes(SanitizePipe)
  async verify (
    @Req() req: Request
  ) {
    const token = req.cookies?.access_token
    return this.authService.verifyAuth(token)
  }

}
