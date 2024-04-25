import { CreateShortUrlInput } from './create-short-url.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShortUrlInput extends PartialType(CreateShortUrlInput) {
  @Field(() => Int)
  id: number;
   
  @Field()
  fullUrl: string;
 
}
