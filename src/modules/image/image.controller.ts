import {
	Controller,
	Get,
	Headers,
	HttpCode,
	HttpStatus,
	Param,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { images } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Image')
@Controller('image')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get()
	getListImages(@Headers('token') token: string): Promise<images[]> {
		return this.imageService.getListImages();
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('/search')
	findImageByName(
		@Query('keyword') keyword: string,
		@Headers('token') token: string,
	): Promise<images[]> {
		return this.imageService.findImageByName(keyword);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('/:imageId')
	getImageByImageId(@Param('imageId') imageId: string): Promise<images> {
		return this.imageService.getImageByImageId(imageId);
	}
}
