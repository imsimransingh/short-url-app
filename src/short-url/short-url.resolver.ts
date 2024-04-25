import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShortUrlService } from './short-url.service';
import { ShortUrl } from './entities/short-url.entity';
import { CreateShortUrlInput } from './dto/create-short-url.input';
import { UpdateShortUrlInput } from './dto/update-short-url.input';

@Resolver(() => ShortUrl)
export class ShortUrlResolver {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  // Mutation resolver to create a short URL
  @Mutation(() => ShortUrl)
  createShortUrl(@Args('createShortUrlInput') createShortUrlInput: CreateShortUrlInput) {
    // Call the create method of the ShortUrlService to create a new short URL
    return this.shortUrlService.create(createShortUrlInput);
  }
 
  // Query resolver to find all short URLs
  @Query(() => [ShortUrl], { name: 'shortUrls' })
  async findAll(
    @Args('pageSize') pageSize: number,
    @Args('currentPage') currentPage: number,
  ) {
    // Call the findAll method of the ShortUrlService to retrieve all short URLs
    return this.shortUrlService.findAll(pageSize, currentPage);
  }

  // Query resolver to find a single short URL by ID
  @Query(() => ShortUrl, { name: 'shortUrl' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    // Call the findOne method of the ShortUrlService to retrieve a single short URL by ID
    return this.shortUrlService.findOne(id);
  }

  // Mutation resolver to update a short URL
  @Mutation(() => ShortUrl)
  async updateShortUrl(@Args('updateShortUrlInput') updateShortUrlInput: UpdateShortUrlInput) {
    // Call the update method of the ShortUrlService to update a short URL
    return await this.shortUrlService.update(updateShortUrlInput.id, updateShortUrlInput);
  }

  // Mutation resolver to remove a short URL by ID
  @Mutation(() => ShortUrl)
  async removeShortUrl(@Args('id', { type: () => Int }) id: number) {
    // Call the remove method of the ShortUrlService to remove a short URL by ID
    return await this.shortUrlService.remove(id);
  }
}
