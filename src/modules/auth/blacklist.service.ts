import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BlacklistService {
  constructor() {

  }

  prisma = new PrismaClient();

  async addTokenToBlacklist(cacheId: string, token: string, expiredAt: Date): Promise<void> {
    await this.prisma.blacklist.create({
      data: {
        cache_id: cacheId,
        token,
        expiredAt,
      },
    });
  }

  async isTokenBlacklisted(cache_id: string): Promise<boolean> {
    const blacklistedToken = await this.prisma.blacklist.findUnique({
      where: { cache_id },
    });
    return !!blacklistedToken;
  }
}
