import { Controller, Post, Body, Get, UseGuards, Req, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('')
@UsePipes(new ValidationPipe())
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: RegisterDto })
    @Post('sign-up')
    async signUp(@Body() registerDto: RegisterDto) {
        return await this.authService.signUp(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: LoginDto })
    @Post('sign-in')
    async signIn(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() req) {
        await this.authService.logout(req.headers.authorization);
    }
}
