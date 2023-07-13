import {
	Injectable,
	HttpException,
	HttpStatus,
	BadRequestException,
} from '@nestjs/common';
import { PrismaClient, images } from '@prisma/client';
import { ImageDto } from './dto/image.dto';

@Injectable()
export class ImageService {
	prisma = new PrismaClient();
	async getListImages(): Promise<images[]> {
		try {
			return await this.prisma.images.findMany();
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async findImageByName(keyword: string): Promise<images[]> {
		try {
			if (!keyword)
				throw new BadRequestException('Missing required data');
			return await this.prisma.images.findMany({
				where: { name: { contains: keyword } },
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async getImageByImageId(imageId: string): Promise<images> {
		try {
			if (!imageId)
				throw new BadRequestException('Missing required data');
			return await this.prisma.images.findUnique({
				where: {
					image_id: +imageId,
				},
				include: {
					user: true,
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async getImagedIsSavedByImageId(imageId: string): Promise<any> {
		try {
			if (!imageId)
				throw new BadRequestException('Missing required data');
			return await this.prisma.store_images.findMany({
				where: {
					image_id: +imageId,
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async addImage(body: ImageDto): Promise<any> {
		try {
			return await this.prisma.images.create({
				data: {
					image_id: +body.image_id,
					name: body.name,
					url: body.url,
					desciption: body.desciption,
					user_id: +body.user_id,
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async getListCreatedImagesByUserId(userId: number): Promise<images[]> {
		try {
			if (!userId) throw new BadRequestException('Missing required data');
			return await this.prisma.images.findMany({
				where: { user_id: +userId },
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async deleteImage(imageId: number): Promise<images> {
		try {
			if (!imageId)
				throw new BadRequestException('Missing required data');
			return await this.prisma.images.delete({
				where: { image_id: +imageId },
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}
