import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthUser } from '../auth/dto/authUser.dto';

@Injectable()
export class StoreImageService {
    constructor(){}

    prisma = new PrismaClient();

    async save(imageId: number, user: AuthUser){
        try{
            const imageExist = await this.prisma.images.findFirst({
                where:{
                    image_id: imageId
                }
            })

            if(!imageExist){
                throw new NotFoundException();
            }
            const checkExist = await this.prisma.store_images.findFirst({
                where:{
                    image_id: imageId,
                    user_id: user.user_id
                }
            })

            if(checkExist){
                throw new ConflictException();
            }

            const store_date = new Date();
            const holderStore = await this.prisma.store_images.create({
                data:{
                    image_id: imageId,
                    user_id: user.user_id,
                    store_date
                }
            })

            if(holderStore){
                return "Saved successfully."
            }
        } catch (err){
            throw new HttpException(err.message, err.status);
        }
    }

    async unSave(imageId: number, user: AuthUser){
        try{
            const checkExist = await this.prisma.store_images.findFirst({
                where:{
                    image_id: imageId,
                    user_id: user.user_id
                }
            })

            if(!checkExist){
                throw new NotFoundException();
            }
            
            return await this.prisma.store_images.delete({
                where:{
                    user_id_image_id:{
                        image_id: imageId,
                        user_id: user.user_id
                    }
                }
            }).then(() => true)
        } catch (err){
            throw new HttpException(err.message, err.status);
        }
    }

    async listByUser(user: AuthUser, skip: number, take: number){
        try{
            skip = skip || 0;
            take = take || 50;
            return await this.prisma.store_images.findMany({
                where:{
                    user_id: user.user_id,
                },
                include: {
                    images: {
                        select:{
                            name: true,
                            url: true,
                        }
                    }, // Lấy thông tin user tương ứng
                },
                skip,
                take
            })
        } catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
}
