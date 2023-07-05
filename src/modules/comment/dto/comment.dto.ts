import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {

    @ApiProperty({
        description: 'Image id',
        type: Number,
    })
    imageId: number;

    @ApiProperty({
        description: 'Content',
        type: String,
    })
    content: string;
}
  