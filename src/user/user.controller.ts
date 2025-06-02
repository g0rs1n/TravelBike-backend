import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { IUserBase } from 'src/common/utils/types';
import { Request } from 'express';

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
}
