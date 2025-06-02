import { 
    Injectable, 
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor (
        private readonly prisma: PrismaService
    ) {}

    async findBy (username: string) {
        try {   
            const user = await this.prisma.user.findUnique({
                where: {username}
            })
            return user
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException("Something went wrong")
        }
    }
}
