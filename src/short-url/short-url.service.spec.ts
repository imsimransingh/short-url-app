// Import necessary modules and dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ShortUrlHelper } from '../helpers/shortUrl.helper';
import { ShortUrlService } from './short-url.service';
import { CreateShortUrlInput } from './dto/create-short-url.input';

// Mock dependencies
jest.mock('@nestjs/config');
jest.mock('../prisma/prisma.service');
jest.mock('../helpers/shortUrl.helper');

// Start describing the ShortUrlService
describe('ShortUrlService', () => {
  let service: ShortUrlService;
  let prismaServiceMock: jest.Mocked<PrismaService>;
  let configServiceMock: jest.Mocked<ConfigService>;
  let shortUrlHelperMock: jest.Mocked<typeof ShortUrlHelper>;

  // Set up before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortUrlService,
        {
          provide: PrismaService,
          // Mock PrismaService methods
          useValue: {
            shortUrl: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: ConfigService,
          // Mock ConfigService methods
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    // Initialize service and mocks
    service = module.get<ShortUrlService>(ShortUrlService);
    prismaServiceMock = module.get(PrismaService);
    configServiceMock = module.get(ConfigService);
    shortUrlHelperMock = ShortUrlHelper as jest.Mocked<typeof ShortUrlHelper>;
  });

  // Test if the service is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test create method of ShortUrlService
  describe('create', () => {
    it('should create a new short URL if it does not already exist', async () => {
      // Define input for creating a short URL
      const createShortUrlInput = { fullUrl: 'example.com' };
      // Define generated short URL
      const generatedShortUrl = 'abc123';

      // Mock generateShortUrl method of ShortUrlHelper and resolve with generatedShortUrl
      shortUrlHelperMock.generateShortUrl.mockResolvedValue(generatedShortUrl as never);
      // Mock findUnique method of ShortUrlService to return null (assuming short URL does not exist)
      (prismaServiceMock.shortUrl.findUnique as jest.Mock).mockResolvedValue(null);
      // Mock create method of ShortUrlService and resolve with created short URL
      (prismaServiceMock.shortUrl.create as jest.Mock).mockResolvedValue({ ...createShortUrlInput, shortUrl: generatedShortUrl });

      // Call create method of service with input
      const result = await service.create({ fullUrl: 'example.com' });

      // Expect result to be equal to created short URL and methods to have been called with correct parameters
      expect(result).toEqual({ ...createShortUrlInput, shortUrl: generatedShortUrl });
      expect(shortUrlHelperMock.generateShortUrl).toHaveBeenCalledWith(createShortUrlInput.fullUrl);
      expect(prismaServiceMock.shortUrl.findUnique).toHaveBeenCalledWith({ where: { shortUrl: generatedShortUrl } });
      expect(prismaServiceMock.shortUrl.create).toHaveBeenCalledWith({ data: { ...createShortUrlInput, shortUrl: generatedShortUrl } });
    });

    it('should return existing short URL if it already exists', async () => {
      // Define input for creating a short URL
      const createShortUrlInput = { fullUrl: 'https://example.com' };
      // Define existing short URL
      const existingShortUrl = { id: 1, shortUrl: 'abc123', fullUrl: 'https://example.com' };

      // Mock generateShortUrl method of ShortUrlHelper and resolve with existing short URL
      shortUrlHelperMock.generateShortUrl.mockResolvedValue(existingShortUrl.shortUrl as never);
      // Mock findUnique method of ShortUrlService and resolve with existing short URL
      (prismaServiceMock.shortUrl.findUnique as jest.Mock).mockResolvedValue(existingShortUrl as never);

      // Call create method of service with input
      const result = await service.create({ fullUrl: createShortUrlInput.fullUrl });

      // Expect result to be equal to existing short URL and methods to have been called with correct parameters
      expect(result).toEqual(existingShortUrl);
      expect(shortUrlHelperMock.generateShortUrl).toHaveBeenCalledWith(createShortUrlInput.fullUrl);
      expect(prismaServiceMock.shortUrl.findUnique).toHaveBeenCalledWith({ where: { shortUrl: existingShortUrl.shortUrl } });
      expect(prismaServiceMock.shortUrl.create).not.toHaveBeenCalled();
    });
  });
});
