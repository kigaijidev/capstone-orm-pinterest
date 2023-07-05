import { ApiProperty } from "@nestjs/swagger";

export class ImageIdDto {
    @ApiProperty({
        description: 'Id is number',
        type: Number,
    })
    imageId: number;
}
  