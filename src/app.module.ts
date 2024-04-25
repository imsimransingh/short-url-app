import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ShortUrlModule } from './short-url/short-url.module';
import {join} from 'path';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema:true
    }),
    ConfigModule.forRoot({
      isGlobal: true,  
    }),
    ShortUrlModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
