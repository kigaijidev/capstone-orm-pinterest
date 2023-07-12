import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, IsDate } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({
    type: String, example:"Test Admin"
  })
  full_name: string;

  @IsDate()
  @ApiProperty({
    type: Date, example:"1999/01/01", format:"YYYY/MM/DD"
  })
  birth_date: Date;
  
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
  