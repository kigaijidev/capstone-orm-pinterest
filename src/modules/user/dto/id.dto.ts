import { ApiProperty } from '@nestjs/swagger';

export class IdDto {
    @ApiProperty({
        description: 'Id user',
        type: Number,
    })
    userId: number;
}
