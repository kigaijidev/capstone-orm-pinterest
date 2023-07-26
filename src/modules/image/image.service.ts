import {
	Injectable,
	HttpException,
	BadRequestException,
	UnauthorizedException,
	ForbiddenException,
} from '@nestjs/common';
import { PrismaClient, images } from '@prisma/client';
import { AuthUser } from '../auth/dto/authUser.dto';

@Injectable()
export class ImageService {
	prisma = new PrismaClient();
	async getListImages(): Promise<images[]> {
		try {
			return await this.prisma.images.findMany({
				where: {
					isAvatar: 0,
				},
			});
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
					user: {
						select: {
							avatar: true,
							full_name: true,
						},
					},
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async getImagedIsSavedByImageId(
		imageId: string,
		userId: string,
	): Promise<any> {
		try {
			if (!imageId)
				throw new BadRequestException('Missing required data');
			return await this.prisma.store_images.findMany({
				where: {
					image_id: +imageId,
					user_id: +userId,
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async addImage(
		user: AuthUser,
		req,
		file: Express.Multer.File,
	): Promise<any> {
		try {
			const { name, description } = req.body;
			return await this.prisma.images.create({
				data: {
					name: name,
					url: '/public/img/' + file.filename,
					user_id: user.user_id,
					description,
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async getListCreatedImagesByUserId(user: AuthUser): Promise<images[]> {
		try {
			if (!user) throw new UnauthorizedException();
			return await this.prisma.images.findMany({
				where: {
					user_id: user.user_id,
					isAvatar: 0,
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async deleteImage(imageId: number): Promise<images> {
		try {
			if (!imageId)
				throw new BadRequestException('Missing required data');

			const delComment = await this.prisma.comments.deleteMany({
				where: {
					image_id: +imageId,
				},
			});

			const delStoreImg = await this.prisma.store_images.deleteMany({
				where: {
					image_id: +imageId,
				},
			});

			if (!delComment || !delStoreImg) {
				throw new ForbiddenException();
			}

			return await this.prisma.images.delete({
				where: {
					image_id: +imageId,
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}
