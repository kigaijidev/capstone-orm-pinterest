import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {
    @ApiProperty({
        description: 'Content',
        type: String,
    })
    content: string;
}
  