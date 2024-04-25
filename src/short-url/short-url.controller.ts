import { Controller, Get, Query, Res, HttpException, HttpStatus  } from '@nestjs/common';
import { Response } from 'express';
import { ShortUrlService } from './short-url.service';
@Controller('redirect')
export class ShortUrlController {

  constructor(private readonly shortUrlService: ShortUrlService) {}
  
  //Below function is used, when user directly hit the short url it will redirect it to
  // Actual/original url
  @Get()
  async redirectToUrl(@Query('url') shortUrl: string, @Res() res: Response) {
    
    if (!shortUrl) {
      throw new HttpException('URL parameter is required', HttpStatus.BAD_REQUEST);
    }
    const originalUrl = await this.shortUrlService.findByShortUrl(shortUrl);
    if (originalUrl) {
      res.redirect(originalUrl.fullUrl);
    } else {
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    }
  }
}
