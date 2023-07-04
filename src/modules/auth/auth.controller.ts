import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('')
@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiBody({ type: RegisterDto })
    @Post('sign-up')
    async signUp(@Body() registerDto: RegisterDto) {
        await this.authService.signUp(registerDto);
        return { message: 'User registered successfully' };
    }

    @Post('sign-in')
    async signIn(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Req() req) {
        await this.authService.logout(req.user.id);
        return { message: 'User logged out successfully' };
    }
}
