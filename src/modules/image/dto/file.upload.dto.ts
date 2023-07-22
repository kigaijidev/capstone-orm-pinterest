import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto{
    @ApiProperty({
        type: String, description:"Name image", example:"Image test"
    })
    name: string

    @ApiProperty({
        type: 'string', format: 'binary'
    })
    file: Express.Multer.File

    @ApiProperty({
        type: String, example:"Description file"
    })
    description: string
}