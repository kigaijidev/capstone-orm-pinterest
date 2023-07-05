import { BadRequestException, UnauthorizedException , Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CommentDto } from './dto/comment.dto'
import { AuthUser } from '../auth/dto/authUser.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    constructor(
    ){}

    prisma = new PrismaClient();

    async create(user: AuthUser, comment: CommentDto){
        try{
            const { imageId, content } = comment;
            if(!imageId || !content){
                throw new BadRequestException('Missing required data');
            }
    
            const comment_date = new Date();
            return await this.prisma.comments.create({
                data:{
                    user_id: user.user_id,
                    image_id: imageId,
                    content,
                    comment_date
                }
            })
        } catch (err){
            throw new ForbiddenException(err);
        }
    }

    async update(commentId: number, user: AuthUser, comment: UpdateCommentDto){

        try{
            const commentExist = await this.prisma.comments.findFirst({
                where:{
                    comment_id: commentId,
                    user_id: user.user_id
                }
            })
    
            if(!commentExist){
                throw new UnauthorizedException();
            }
    
            const { content } = comment;
      
            if(!content){
                throw new BadRequestException('Missing required data');
            }
    
            return await this.prisma.comments.update({
                where:{
                    comment_id: commentId,
                },
                data:{
                    content,
                }
            })
        } catch(err){
            throw new ForbiddenException(err)
        }
    }

    async delete(commentId: number, user: AuthUser){
        try{
            const commentExist = await this.prisma.comments.findFirst({
                where:{
                    comment_id: commentId,
                    user_id: user.user_id
                }
            })
    
            if(!commentExist){
                throw new UnauthorizedException();
            }

            return await this.prisma.comments.delete({
                where:{
                    comment_id: commentId,
                }
            })
        } catch(err){
            throw new ForbiddenException(err)
        }
    }

    async listByImage(imageId: number, skip: number, take: number){
        try{
            skip = skip || 0;
            take = take || 50;
            return await this.prisma.comments.findMany({
                where:{
                    image_id: imageId,
                },
                include: {
                    user: {
                        select:{
                            full_name: true,
                            avatar: true,
                        }
                    }, // Lấy thông tin user tương ứng
                },
                skip,
                take
            })
        } catch(err){
            throw new ForbiddenException(err)
        }
    }
}
