import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BlacklistService } from './blacklist.service'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategy/jwt.strategy';

@Module({
  imports:[
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true}),
  ],
  controllers: [AuthController],
  providers: [AuthService, BlacklistService, JwtStrategy]
})
export class AuthModule {}
