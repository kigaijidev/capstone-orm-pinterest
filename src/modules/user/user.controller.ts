import { 
    Controller, 
    Get,
    HttpCode, 
    HttpStatus, 
    Patch,
    Req, 
    UseGuards, 
    UseInterceptors,
    UploadedFile,
    Res,
    ValidationPipe,
    UsePipes,
    Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import slugify from 'slugify';
import { UpdateUserDto } from './dto/update-user.dto';
import { AvatarUploadDto } from '../image/dto/avatar.upload.dto';

@Controller('user')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class UserController {
    constructor(private readonly userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Get('info')
    async user(@Req() req) {
        return await this.userService.user(req.user);
    }
    
    @HttpCode(HttpStatus.OK)
    @Patch('avatar')
    @ApiBody({ description: "Choose Image", type: AvatarUploadDto})
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: process.cwd() +'/public/img',
                filename: (req, file, callback) => {
                    callback(null, Date.now() + slugify(file.originalname));
                },
            }),
        }),
    )
    async uploadAvatar( @Req() req, @UploadedFile() file) {
        return await this.userService.uploadAvatar(req.user, file);
    }

    @HttpCode(HttpStatus.OK)
    @Put('info')
    @ApiBody({ type: UpdateUserDto })
    async update( @Req() req) {
        return await this.userService.update(req.user, req.body);
    }
}
