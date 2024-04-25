import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsUrl } from 'class-validator';
@InputType()
export class CreateShortUrlInput {

  @IsOptional()
  @IsString()
  @IsUrl()
  shortUrl: string;

  @Field()
  fullUrl: string; 

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
