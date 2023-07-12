import { BadRequestException, ConflictException, ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from "bcrypt";

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InvalidCredentialException } from './exceptions/invalid-credential.exception';
import { BlacklistService } from './blacklist.service';
import { AuthUser } from './dto/authUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly blacklistService: BlacklistService
  ) {}

  prisma = new PrismaClient()

  async signUp(registerDto: RegisterDto) {
    try{
      const { full_name, email, password, birth_date } = registerDto;
      if(!full_name || !email || !password || birth_date){
        throw new BadRequestException();
      }
      // Validate and save user to the database
      const holderUser = await this.prisma.user.findFirst({
        where:{ email }
      })
  
      if(holderUser){
        throw new ConflictException("User already exist");
      }
  
      const hashPassword = await bcrypt.hashSync(password, 10);
  
      await this.prisma.user.create({
        data: {
          full_name,
          email,
          birth_date,
          password: hashPassword,
        },
      });
  
      return "Sign Up successfully";
    } catch (err){
      throw new HttpException(err.message, err.status);
    }
  }

  async signIn(loginDto: LoginDto) {
    try{
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
  
      const payload = new AuthUser(user);
  
      const accessToken = await this.jwtService.signAsync(payload.toJSON(), {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get<number>('JWT_EXPIRED_TIME')
      });
  
      return { 
        accessToken,
        expiresIn: this.configService.get<number>('JWT_EXPIRED_TIME')
      };
    } catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async logout(token: string) {
    try{
      const tokenWithoutBearer = token.replace('Bearer ', '');
      const { exp, cacheId } = this.jwtService.decode(tokenWithoutBearer) as { exp: number, cacheId: string };
      const expiredAt = new Date(exp * 1000);
      await this.blacklistService.addTokenToBlacklist(cacheId, tokenWithoutBearer, expiredAt);
      return 'Logout'
    } catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
}
