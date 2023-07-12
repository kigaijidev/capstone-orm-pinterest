import {
	Injectable,
	HttpException,
	HttpStatus,
	BadRequestException,
} from '@nestjs/common';
import { PrismaClient, images } from '@prisma/client';

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
				include: {
					user: true,
				},
				where: {
					image_id: +imageId,
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}
