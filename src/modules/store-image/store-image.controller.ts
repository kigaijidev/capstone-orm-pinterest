import { StoreImageService } from './store-image.service';
import { Controller, Post, Body, Get, UseGuards, Req, HttpCode, HttpStatus, UsePipes, ValidationPipe, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ImageIdDto } from '../image/dto/id.dto';

@ApiTags('Store images')
@Controller('store-images')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StoreImageController {
    constructor(private readonly storeImageService: StoreImageService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('/:imageId')
    async save(
        @Req() req,
        @Param() idDto: ImageIdDto,
    ) {
        return await this.storeImageService.save(Number(idDto.imageId), req.user);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/:imageId')
    async unSave(
        @Req() req,
        @Param() idDto: ImageIdDto,
    ) {
        return await this.storeImageService.unSave(Number(idDto.imageId), req.user);
    }

    @HttpCode(HttpStatus.OK)
    @Get('')
    async listByUser(@Req() req) {
        return await this.storeImageService.listByUser(req.user, 0, 50);
    }
}
