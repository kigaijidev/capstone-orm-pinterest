import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { IdDto } from './dto/id.dto';

@Controller('user')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Get('')
    async list(@Req() request) {
        console.log(request);
        return await this.userService.list();
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:userId')
    async user(@Param() idDto: IdDto) {
        return await this.userService.user(Number(idDto.userId));
    }
}
