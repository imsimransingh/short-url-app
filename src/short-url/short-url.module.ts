import { Module } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlResolver } from './short-url.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { ShortUrlController } from './short-url.controller';
@Module({
  providers: [ShortUrlResolver, ShortUrlService, PrismaService],
  controllers: [ShortUrlController]
})
export class ShortUrlModule {}
