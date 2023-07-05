import { ApiProperty } from "@nestjs/swagger";

export class CommentIdDto {
    @ApiProperty({
        description: 'Id is number',
        type: Number,
    })
    commentId: number;
}
  