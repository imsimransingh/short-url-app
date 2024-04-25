import { createHash } from 'crypto';

export class ShortUrlHelper {
    static generateShortUrl(originalUrl: string): string {
        return createHash('sha256').update(originalUrl).digest('base64')
            .replace(/[\+\/\=]/g, '').substring(0, 8);  
    }
}
