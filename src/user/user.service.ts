import { 
    Injectable
} from '@nestjs/common';
import { IRegisterData } from 'src/common/utils/types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor (
        private readonly prisma: PrismaService
    ) {}

    async findById (userId: number) {
        try {

            const user = await this.prisma.user.findUnique({
                where: {id: userId}
            })

            return user
            
        } catch (error) {
            console.error("FindById UserService error:", error)
            throw error
        }
    }

    async findUser (payload: string) {
        try {   
            const user = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        {email: payload},
                        {username: payload},
                    ]
                }
            })
            return user
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async createUser (payload: IRegisterData) {
        try {
            const newUser = await this.prisma.user.create({
                data: payload
            })
            return newUser
        } catch (error) {
            console.error("CreateUser error:", error)
            throw error
        }
    }
}
