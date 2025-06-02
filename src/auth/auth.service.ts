import { 
    Injectable, 
    ConflictException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { IRegisterData } from 'src/common/utils/types';
import { PasswordService } from './password/password.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService,
    ) {}

    async register (registerData: IRegisterData) {
        try {
            const {password, ...rest} = registerData
            const user = await this.userService.findBy(rest.username)
            if (user) throw new ConflictException('User already exists')
            const hashPassword = await this.passwordService.hashPassword(password)
            const newUser = await this.prisma.user.create({
                data: {
                    ...rest,
                    password: hashPassword,
                }
            })
            if (newUser) {
                const {id} = newUser
                return this.jwtService.sign({sub: id})
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
