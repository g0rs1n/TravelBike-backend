import { 
  Controller, 
  Get, 
  Post,
  Res,
  Req, 
  UseGuards,
  HttpCode,
  Patch,
  Body,
  UsePipes
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { IUserBase } from 'src/common/utils/types';
import { Request, Response } from 'express';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SanitizePipe } from 'src/common/pipes/sanitize/sanitize.pipe';

interface RequestWithUser extends Request {
  user: IUserBase;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser (
    @Req() req: RequestWithUser
  ) {
    return req.user
  }

  @HttpCode(200)
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(
    @Res({passthrough: true}) res: Response
  ) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    })
    return {success: true, message: "Logged out successfully"}
  }

  @HttpCode(200)
  @Patch()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(SanitizePipe)
  async updateUser (
    @Req() req: RequestWithUser,
    @Body() userDto: UpdateUserDto
  ) {
    const userId = req.user.id
    const newUser = await this.userService.updateUser(userDto, userId)
    return {
      message: "Profile updated",
      user: newUser
    }
  }

}
