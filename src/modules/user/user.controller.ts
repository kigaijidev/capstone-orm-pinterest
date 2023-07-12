import { 
    Body, 
    Controller, 
    Get,
     HttpCode, 
     HttpStatus, 
     Param, 
     Patch, 
     Post, 
     Req, 
     UseGuards, 
     UseInterceptors,
     UploadedFile,
     Res,
     ValidationPipe,
     UsePipes
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from 'express';
import { AuthUser } from '../auth/dto/authUser.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from '../image/dto/file.upload.dto';
import slugify from 'slugify';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class UserController {
    constructor(private readonly userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Get('info')
    async user(@Req() req: AuthUser) {
        return await this.userService.user(req);
    }
    
    @HttpCode(HttpStatus.OK)
    @Patch('avatar')
    @ApiBody({ description: "Choose Image", type: FileUploadDto})
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: process.cwd() +'/public/img',
                filename: (req, file, callback) => {
                    console.log(file)
                    callback(null, Date.now() + slugify(file.originalname));
                },
            }),
        }),
    )
    async uploadAvatar( @Req() req, @UploadedFile() file) {
        return await this.userService.uploadAvatar(req.user, req, file);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('info')
    @ApiBody({ type: UpdateUserDto })
    async update( @Req() req) {
        return await this.userService.update(req.user, req.body);
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:name')
    async readFile(@Param('name') name: String, @Res() res): Promise<any> {
        name = name.replace(/[\\\/]/g, '');
        console.log(name);

        return res.sendFile('/img' + '/' + name, (err) => {
            if (err) {
                res.status(err.status).end();
            }
        });
    }
}
