import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto {
    @ApiProperty({
        description: 'Content',
        type: String,
    })
    content: string;
}
  