import { CommentDto } from './dto/comment.dto';
import { CommentService } from './comment.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CommentIdDto } from './dto/id.dto';
import { ImageIdDto } from '../image/dto/id.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}
    
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: CommentDto })
    @Post('/:imageId')
    async create(
        @Req() req,
        @Param() idDto: ImageIdDto,
        @Body() commentDto: CommentDto
    ) {
        return await this.commentService.create(req.user, Number(idDto.imageId), commentDto.content);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: UpdateCommentDto })
    @Patch('/:commentId')
    async update(
        @Param() idDto: CommentIdDto,
        @Req() req,
        @Body() updateComment: UpdateCommentDto
    ) {
        return await this.commentService.update(Number(idDto.commentId), req.user, updateComment);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('/:commentId')
    async delete(
        @Param() idDto: CommentIdDto,
        @Req() req,
    ) {
        return await this.commentService.delete(Number(idDto.commentId), req.user);
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:imageId')
    async listByImage(
        @Param() idDto: ImageIdDto,
        @Query() query
    ) {
        return await this.commentService.listByImage(Number(idDto.imageId), query.skip, query.take);
    }
}
