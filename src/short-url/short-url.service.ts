// Import necessary modules and dependencies
import { Injectable } from '@nestjs/common';
import { CreateShortUrlInput } from './dto/create-short-url.input';
import { UpdateShortUrlInput } from './dto/update-short-url.input';
import { PrismaService } from '../prisma/prisma.service';
import { ShortUrlHelper } from '../helpers/shortUrl.helper';
import { ConfigService } from '@nestjs/config';

// Define Injectable for ShortUrlService
@Injectable()
export class ShortUrlService {
  private hostUrl: string;

  // Constructor to initialize ShortUrlService with PrismaService and ConfigService
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    // Get HOST_URL from environment variables and construct hostUrl for redirection
    this.hostUrl = this.configService.get<string>('HOST_URL')+'/redirect?url=';
  }

  // Method to create a new short URL
  async create({ fullUrl }: { fullUrl: string }): Promise<CreateShortUrlInput> {
    // Generate a short URL using ShortUrlHelper
    const generatedShortUrl = await ShortUrlHelper.generateShortUrl(fullUrl);
    // Check if the generated short URL already exists in the database
    const checkIfAlreadyExist = await this.findByShortUrl(generatedShortUrl);

    if (!checkIfAlreadyExist) {
      // If the short URL doesn't exist, add it as a new entry in the database
      return await this.prisma.shortUrl.create({ data: { fullUrl, shortUrl: generatedShortUrl } });
    } else {
      // If the short URL already exists, return it
      return checkIfAlreadyExist;
    }
  }

  // Method to find all short URLs with pagination
  async findAll(pageSize: number = 5, currentPage: number = 1) {
    // Calculate skip value for pagination
    const skip = (currentPage - 1) * pageSize;
    // Fetch all URLs from the database with pagination
    const allUrls = await this.prisma.shortUrl.findMany({
      take: pageSize,
      skip: skip,
    });
    // Append hostUrl to each short URL for redirection
    const returnWithFullUrl = allUrls.map((url) => {
      return { ...url, fullUrl: this.hostUrl + url.shortUrl };
    });
    // Return short URLs with hostUrl appended
    return returnWithFullUrl;
  }

  // Method to find a single short URL by ID
  async findOne(id: number) {
    return await this.prisma.shortUrl.findUnique({ where: { id } });
  }

  // Method to find a single short URL by shortUrl
  async findByShortUrl(shortUrl: string): Promise<CreateShortUrlInput> {
    return await this.prisma.shortUrl.findUnique({
      where: { shortUrl },
    });
  }

  // Method to update a short URL
  async update(id: number, updateShortUrlInput: UpdateShortUrlInput) {
    return await this.prisma.shortUrl.update({
      where: { id },
      data: { fullUrl: updateShortUrlInput.fullUrl },
    });
  }

  // Method to remove a short URL by ID
 async remove(id: number) {
    return await this.prisma.shortUrl.delete({ where: { id } });
  }
}