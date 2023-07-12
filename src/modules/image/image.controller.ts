import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { images } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ImageDto } from './dto/image.dto';

@ApiTags('Image')
@Controller('image')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get()
	getListImages(): Promise<images[]> {
		return this.imageService.getListImages();
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('/search')
	findImageByName(@Query('keyword') keyword: string): Promise<images[]> {
		return this.imageService.findImageByName(keyword);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('/detail/:imageId')
	getImageByImageId(@Param('imageId') imageId: string): Promise<images> {
		return this.imageService.getImageByImageId(imageId);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('/saved-img')
	getImagedIsSavedByImageId(@Query('imageId') imageId: string): Promise<any> {
		return this.imageService.getImagedIsSavedByImageId(imageId);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Post()
	addImage(@Body() body: ImageDto): Promise<any> {
		return this.imageService.addImage(body);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('/created/:userId')
	getListCreatedImagesByUserId(
		@Param('userId') userId: number,
	): Promise<images[]> {
		return this.imageService.getListCreatedImagesByUserId(userId);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Delete('/delete/:imageId')
	deleteImage(@Param('imageId') imageId: number): Promise<images> {
		return this.imageService.deleteImage(imageId);
	}
}
