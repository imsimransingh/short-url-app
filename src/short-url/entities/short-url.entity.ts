import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsUrl } from 'class-validator';
@ObjectType()
export class ShortUrl {
  @Field()
  id: number;

  @Field()
  shortUrl: string;

  @Field()
  fullUrl: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

}
