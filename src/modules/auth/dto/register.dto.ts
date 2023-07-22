import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength, IsDate, IsDateString, IsNotEmpty } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({
    type: String, example:"Test Admin"
  })
  full_name: string;

  @IsDateString({ strict: true })
  @Transform(({ value }) => value.split('T')[0])
  @IsNotEmpty()
  @ApiProperty({
      description: 'birth_date',
      example:"1999-01-01",
      type: String,
      format:"YYYY-MM-DD"
  })
  birth_date: string;
  
  @IsEmail()
  @ApiProperty({
    type: String, example:"testadmin@gmail.com"
  })
  email: string;
  
  @IsString()
  @MinLength(8)
  @ApiProperty({
    type: String, example:"12345678"
  })
  password: string;
}
  