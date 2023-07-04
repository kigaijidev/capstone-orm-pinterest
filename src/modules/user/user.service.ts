import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IdDto } from './dto/id.dto';

@Injectable()
export class UserService {
    constructor(){

    }

    prisma = new PrismaClient();

    async list(){
        const holderUsers = await this.prisma.user.findMany();
        return holderUsers;
    }

    async user(user_id: number){
        const holderUser = await this.prisma.user.findFirst({
            where: { user_id }
        });

        if(!holderUser){
            throw new NotFoundException();
        }
        return holderUser;
    }
}
