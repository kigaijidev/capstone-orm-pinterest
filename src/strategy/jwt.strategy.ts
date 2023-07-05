import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlacklistService } from '../modules/auth/blacklist.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        config: ConfigService,
        private blacklistService: BlacklistService,) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_SECRET"),
        });
    }
    async validate(payload: any) {
        const isTokenBlacklisted = await this.blacklistService.isTokenBlacklisted(
          payload.cacheId,
        );
        if (isTokenBlacklisted) {
          throw new UnauthorizedException('Invalid token');
        }
        return payload;
      }
}
