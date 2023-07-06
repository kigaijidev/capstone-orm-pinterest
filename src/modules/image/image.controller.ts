import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { images } from '@prisma/client';

@ApiTags('Image')
@Controller('image')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	getListImages(): Promise<images[]> {
		return this.imageService.getListImages();
	}
}
