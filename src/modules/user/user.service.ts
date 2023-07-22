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
            const { full_name, birth_date } = info;
            const convertDate = new Date(birth_date);
            if(isNaN(convertDate.getMilliseconds())){
                throw new BadRequestException('Missing required data')
            }
            const updated = await this.prisma.user.update({
                where: { 
                    user_id: user.user_id
                },
                data:{
                    full_name,
                    birth_date: convertDate
                }
            });

            if(!updated){
                throw new ForbiddenException();
            }

            return true;

        } catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async uploadAvatar(user: AuthUser, file: Express.Multer.File ){
        try{
            const image = await this.prisma.images.create({
                data: { 
                    user_id: user.user_id,
                    name: file.filename,
                    url: '/public/img/'+ file.filename,
                    isAvatar: 1,
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
                    avatar: image.url,
                }
            });
        } catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
}
