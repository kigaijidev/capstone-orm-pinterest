import { Controller, Post, Body, Get, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: RegisterDto })
    @Post('sign-up')
    async signUp(@Body() registerDto: RegisterDto) {
        await this.authService.signUp(registerDto);
        return { message: 'User registered successfully' };
    }

    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: LoginDto })
    @Post('sign-in')
    async signIn(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Req() req) {
        return { message: 'User logged out successfully' };
    }
}
