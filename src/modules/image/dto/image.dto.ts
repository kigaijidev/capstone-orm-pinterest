import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
	@ApiProperty({
		description: 'Image Id',
		type: Number,
	})
	image_id: number;

	@ApiProperty({
		description: 'Name',
		type: String,
	})
	name: string;

	@ApiProperty({
		description: 'URL',
		type: String,
	})
	url: string;

	@ApiProperty({
		description: 'Description',
		type: String,
	})
	desciption: string;

	@ApiProperty({
		description: 'User Id',
		type: Number,
	})
	user_id: number;
}
