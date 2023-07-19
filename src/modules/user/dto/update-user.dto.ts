import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MinLength, IsDate, IsDateString} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @MinLength(4)
    @ApiProperty({
        description: 'full_name',
        example:"Admin Full name",
        type: String,
    })
    full_name: string;
    
    @IsDateString({ strict: true })
    @Transform(({ value }) => value.toISOString().split('T')[0])
    @ApiProperty({
        description: 'birth_date',
        example:"1999-01-01",
        type: String,
        format:"YYYY-MM-DD"
    })
    birth_date: string;
}
