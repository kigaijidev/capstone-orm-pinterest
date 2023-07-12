import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsDate} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @MinLength(4)
    @ApiProperty({
        description: 'full_name',
        example:"Admin Full name",
        type: String,
    })
    full_name: string;
    
    @IsDate()
    @ApiProperty({
        description: 'birth_date',
        example:"1999/01/01",
        type: Date,
        format:"YYYY/MM/DD"
    })
    birth_date: Date;
}
