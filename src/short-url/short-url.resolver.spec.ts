// Import necessary modules and dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlResolver } from './short-url.resolver';
import { ShortUrlService } from './short-url.service';
import { CreateShortUrlInput } from './dto/create-short-url.input';
import { UpdateShortUrlInput } from './dto/update-short-url.input';
import { ShortUrl } from './entities/short-url.entity';

// Start describing the ShortUrlResolver
describe('ShortUrlResolver', () => {
  let resolver: ShortUrlResolver;
  let shortUrlService: ShortUrlService;

  // Set up before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortUrlResolver,
        {
          provide: ShortUrlService,
          // Mock ShortUrlService methods
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    // Initialize resolver and shortUrlService
    resolver = module.get<ShortUrlResolver>(ShortUrlResolver);
    shortUrlService = module.get<ShortUrlService>(ShortUrlService);
  });

  // Test if the resolver is defined
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // Test createShortUrl resolver function
  describe('createShortUrl', () => {
    it('should call create method of ShortUrlService', async () => {
      // Define input for creating a short URL
      const createShortUrlInput: CreateShortUrlInput = {
        shortUrl: 'abc123',
        fullUrl: 'https://www.google.com',
      };
      // Define the expected created short URL
      const createdShortUrl: ShortUrl = {
        id: 1,
        shortUrl: 'abc123',
        fullUrl: 'https://www.google.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock the create method of ShortUrlService and resolve with createdShortUrl
      jest.spyOn(shortUrlService, 'create').mockResolvedValue(createdShortUrl);

      // Call createShortUrl resolver with input
      const result = await resolver.createShortUrl(createShortUrlInput);

      // Expect result to be equal to createdShortUrl and create method to have been called with input
      expect(result).toEqual(createdShortUrl);
      expect(shortUrlService.create).toHaveBeenCalledWith(createShortUrlInput);
    });
  });

  // Test findAll resolver function
  describe('findAll', () => {
    it('should call findAll method of ShortUrlService', async () => {
      // Define page size and current page for pagination
      const pageSize = 10;
      const currentPage = 1;
      // Define the expected found short URLs array
      const foundShortUrls: ShortUrl[] = [];

      // Mock the findAll method of ShortUrlService and resolve with foundShortUrls
      jest.spyOn(shortUrlService, 'findAll').mockResolvedValue(foundShortUrls);

      // Call findAll resolver with pagination parameters
      const result = await resolver.findAll(pageSize, currentPage);

      // Expect result to be equal to foundShortUrls and findAll method to have been called with pagination parameters
      expect(result).toEqual(foundShortUrls);
      expect(shortUrlService.findAll).toHaveBeenCalledWith(pageSize, currentPage);
    });
  });

  // Test findOne resolver function
  describe('findOne', () => {
    it('should call findOne method of ShortUrlService', async () => {
      // Define ID for finding a short URL
      const id = 1;
      // Define the expected found short URL
      const foundShortUrl: ShortUrl = {
        id: 1,
        shortUrl: 'abc123',
        fullUrl: 'https://www.google.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock the findOne method of ShortUrlService and resolve with foundShortUrl
      jest.spyOn(shortUrlService, 'findOne').mockResolvedValue(foundShortUrl);

      // Call findOne resolver with ID
      const result = await resolver.findOne(id);

      // Expect result to be equal to foundShortUrl and findOne method to have been called with ID
      expect(result).toEqual(foundShortUrl);
      expect(shortUrlService.findOne).toHaveBeenCalledWith(id);
    });
  });

  // Test updateShortUrl resolver function
  describe('updateShortUrl', () => {
    it('should call update method of ShortUrlService', async () => {
      // Define input for updating a short URL
      const updateShortUrlInput: UpdateShortUrlInput = {
        id: 1,
        fullUrl: 'https://www.nestjs.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // Define the expected updated short URL
      const updatedShortUrl: ShortUrl = {
        id: 1,
        shortUrl: 'abc123',
        fullUrl: 'https://www.nestjs.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock the update method of ShortUrlService and resolve with updatedShortUrl
      jest.spyOn(shortUrlService, 'update').mockResolvedValue(updatedShortUrl);

      // Call updateShortUrl resolver with input
      const result = await resolver.updateShortUrl(updateShortUrlInput);

      // Expect result to be equal to updatedShortUrl and update method to have been called with input
      expect(result).toEqual(updatedShortUrl);
      expect(shortUrlService.update).toHaveBeenCalledWith(
        updateShortUrlInput.id,
        updateShortUrlInput,
      );
    });
  });

  // Test removeShortUrl resolver function
  describe('removeShortUrl', () => {
    it('should call remove method of ShortUrlService', async () => {
      // Define ID for removing a short URL
      const id = 1;

      // Mock the remove method of ShortUrlService and resolve with null (assuming successful removal)
      jest.spyOn(shortUrlService, 'remove').mockResolvedValue(null);

      // Call removeShortUrl resolver with ID
      const result = await resolver.removeShortUrl(id);

      // Expect result to be null and remove method to have been called with ID
      expect(result).toBeNull();
      expect(shortUrlService.remove).toHaveBeenCalledWith(id);
    });
  });
});
