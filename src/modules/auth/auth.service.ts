import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
const { PrismaClient } = require('@prisma/client')

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  prisma = new PrismaClient()

  async signUp(registerDto: RegisterDto) {
    const { password } = registerDto;
    // Validate and save user to the database
    await this.prisma.user.create({
      data: {
        full_name: registerDto.full_name,
        email: registerDto.email,
        password: registerDto.password,
      },
    });
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { 
        'email': loginDto.email 
      },
    });

    if (!user || user.password !== loginDto.password) {
      throw new Error('Invalid username or password');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get<number>('JWT_EXPIRED_TIME')
    });

    return { accessToken };
  }

  async logout(userId: number) {
    // Perform logout actions, such as invalidating tokens, etc.
    // For example, you can maintain a blacklist of invalidated tokens
    // associated with the user in the database or cache.
  }
}
