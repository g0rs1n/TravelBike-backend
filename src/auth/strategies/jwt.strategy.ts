import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-jwt'
import { UserService } from "src/user/user.service";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: (req: Request) => {
                if (!req || !req.cookies) return null
                return req.cookies.access_token
            },
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate (payload: {sub: number}) {
        const user = await this.userService.findById(payload.sub)
        if (!user) throw new UnauthorizedException('Access denied')
        const {password:_, ...restUserData} = user
        return restUserData
    }
}