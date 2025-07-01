import { 
    Injectable
} from '@nestjs/common';
import { IRegisterData} from 'src/common/utils/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dtos/update-user.dto';

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

    async updateUser (userData: UpdateUserDto, userId: number) {
        try {

            const user = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: userData
            })

            const {password:_, ...newUser} = user

            return newUser
            
        } catch (error) {
            console.error("Error updating user:", error)
            throw error
        }
    }

}
