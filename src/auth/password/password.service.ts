import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class PasswordService {
    constructor () {}

    async hashPassword (password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    }

    async comparePassword (password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}
