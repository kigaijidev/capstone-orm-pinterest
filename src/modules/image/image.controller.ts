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
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { images } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ImageDto } from './dto/image.dto';
import { FileUploadDto } from './dto/file.upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import slugify from 'slugify';

@ApiTags('Image')
@Controller('image')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	getListImages(): Promise<images[]> {
		return this.imageService.getListImages();
	}

	@HttpCode(HttpStatus.OK)
	@Get('/search')
	findImageByName(@Query('keyword') keyword: string): Promise<images[]> {
		return this.imageService.findImageByName(keyword);
	}

	@HttpCode(HttpStatus.OK)
	@Get('/detail/:imageId')
	getImageByImageId(@Param('imageId') imageId: string): Promise<images> {
		return this.imageService.getImageByImageId(imageId);
	}

	@HttpCode(HttpStatus.OK)
	@Get('/saved-img')
	getImagedIsSavedByImageId(
		@Query('imageId') imageId: string,
		@Query('userId') userId: string,
	): Promise<any> {
		return this.imageService.getImagedIsSavedByImageId(imageId, userId);
	}

	@HttpCode(HttpStatus.CREATED)
	@ApiBody({ description: 'Choose Image', type: FileUploadDto })
	@ApiConsumes('multipart/form-data')
	@Post()
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: process.cwd() + '/public/img',
				filename: (req, file, callback) => {
					callback(null, Date.now() + slugify(file.originalname));
				},
			}),
		}),
	)
	addImage(@Req() req, @UploadedFile() file): Promise<any> {
		return this.imageService.addImage(req.user, req, file);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('/created')
	getListCreatedImagesByUserId(@Req() req): Promise<images[]> {
		return this.imageService.getListCreatedImagesByUserId(req.user);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Delete('/delete/:imageId')
	deleteImage(@Param('imageId') imageId: number): Promise<images> {
		return this.imageService.deleteImage(imageId);
	}
}
