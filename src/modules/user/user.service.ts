import { BadRequestException, ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { AuthUser } from '../auth/dto/authUser.dto';
import slugify from 'slugify';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(){

    }

    prisma = new PrismaClient();

    async user(user: AuthUser){
        try{
            const holderUser = await this.prisma.user.findFirst({
                where: { 
                    user_id: user.user_id
                }
            });
    
            if(!holderUser){
                throw new NotFoundException();
            }
            return holderUser;
        } catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async update(user: AuthUser, info: UpdateUserDto){
        try{
            console.log(info);
            const { full_name, birth_date } = info;
            return await this.prisma.user.update({
                where: { 
                    user_id: user.user_id
                },
                data:{
                    full_name,
                    birth_date
                }
            });

        } catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async uploadAvatar(user: AuthUser, req: Request, file: Express.Multer.File ){
        try{
            const { desciption } = req.body;
            const image = await this.prisma.images.create({
                data: { 
                    user_id: user.user_id,
                    name: file.filename,
                    url: file.filename,
                    desciption
                }
            });

            if(!image){
                throw new BadRequestException();
            }

            return await this.prisma.user.update({
                where:{
                    user_id: user.user_id
                },
                data: { 
                    avatar: file.filename,
                }
            });
        } catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
}
