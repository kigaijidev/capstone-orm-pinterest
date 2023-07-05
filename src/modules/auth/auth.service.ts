import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';
import { InvalidCredentialException } from './exceptions/invalid-credential.exception';
import { BlacklistService } from './blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly blacklistService: BlacklistService
  ) {}

  prisma = new PrismaClient()

  async signUp(registerDto: RegisterDto) {
    const { full_name, email, password } = registerDto;
    // Validate and save user to the database
    const holderUser = await this.prisma.user.findFirst({
      where:{ email }
    })

    if(holderUser){
      throw new UserAlreadyExistException();
    }

    const hashPassword = await bcrypt.hashSync(password, 10);

    await this.prisma.user.create({
      data: {
        full_name,
        email,
        password: hashPassword,
      },
    });

    return "Sign Up successfully";
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { 
        email: loginDto.email 
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const validPassword = await bcrypt.compare(loginDto.password, user.password);
    if(!validPassword){
      throw new InvalidCredentialException();
    }

    const payload = { 
        full_name: user.full_name, 
        email: user.email, 
        cacheId: uuidV4() 
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get<number>('JWT_EXPIRED_TIME')
    });

    return { 
      accessToken,
      expiresIn: this.configService.get<number>('JWT_EXPIRED_TIME')
    };
  }

  async logout(token: string) {
    const tokenWithoutBearer = token.replace('Bearer ', '');
    const { exp, cacheId } = this.jwtService.decode(tokenWithoutBearer) as { exp: number, cacheId: string };
    const expiredAt = new Date(exp * 1000);
    await this.blacklistService.addTokenToBlacklist(cacheId, tokenWithoutBearer, expiredAt);
    return 'Logout'
  }
}