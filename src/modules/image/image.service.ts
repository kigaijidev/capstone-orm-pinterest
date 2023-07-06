import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient, images } from '@prisma/client';

@Injectable()
export class ImageService {
	prisma = new PrismaClient();
	async getListImages(): Promise<images[]> {
		try {
			return await this.prisma.images.findMany();
		} catch (error) {
			throw new HttpException('Forrbidden', HttpStatus.FORBIDDEN);
		}
	}
}
