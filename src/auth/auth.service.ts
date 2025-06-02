import { 
    Injectable, 
    ConflictException,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { IRegisterData, ILoginData } from 'src/common/utils/types';
import { PasswordService } from './password/password.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService,
    ) {}

    async register (registerData: IRegisterData) {
        try {
            const {password, ...rest} = registerData

            const user: User | null = await this.userService.findUser(rest.username)
            if (user) throw new ConflictException('User already exists')

            const hashPassword = await this.passwordService.hashPassword(password)

            const newUser = await this.userService.createUser({
                ...rest,
                password: hashPassword,
            })
            if (newUser) {
                const {id} = newUser
                return this.jwtService.sign({sub: id})
            }
        } catch (error) {
            console.error("Register api error",error)
            throw error
        }
    }

    async validateUser (loginPayload: ILoginData) {
        try {
            const {email, password} = loginPayload

            const user: User | null = await this.userService.findUser(email)
            if (!user) throw new NotFoundException("Invalid credentials")

            const isPassword = await this.passwordService.comparePassword(password, user.password)
            if (!isPassword) throw new UnauthorizedException("Invalid credentials")

            const {password:_, id} = user
            return this.jwtService.sign({sub: id})
            
        } catch (error) {
            console.error("Vilidate User: error", error)
            throw error
        }
    }
}
