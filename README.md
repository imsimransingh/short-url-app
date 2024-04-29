## ShortUrl Application Documentation

### Overview

The ShortUrl application is a NestJS-based system designed to create, manage, and track short URLs. It utilizes GraphQL for its API interface, Prisma as its ORM for interacting with a PostgreSQL database, and class-validator for input validation. The application supports operations such as creating a new short URL, retrieving all short URLs with pagination, finding specific short URLs, updating, and deleting them.

### Technologies Used

- NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- GraphQL: A query language for APIs and a runtime for executing those queries with your existing data.
- Prisma: Next-generation ORM for Node.js and TypeScript, which supports PostgreSQL among other databases.
- PostgreSQL: A powerful, open source object-relational database system.
- Jest: Default test framework by NestJs
#### Project Setup ####

Postgreaql is used for database and is hosted on `https://console.neon.tech` as a free hosting plans
We can use Docker as well but for simplycity(i.e. to run directly on local), I have used above.

## Step:1  Clone project  ##

run command git clone https://github.com/imsimransingh/short-url-app.git

## Step: 2 npm install ##
 
 run `npm install`

## Step: 3 Prisma migrations run ##
 
Run prisma migrations

run `npx prisma migrate dev` 

# Prisma Studio #
run `npx prisma studio` this will gives us the prisma UI for our database tables

![image](https://github.com/imsimransingh/short-url-app/assets/95456903/98062195-bbbe-4936-a396-0be18160f145)



## Step: 5 Run Project ##
 
run `npm run start:dev` this will run our nest server, after success you will be able to access
`http://localhost:3000/graphql`


## To run operations ##

- Create Record in Database (i.e. create short url link)
- Inside of graphql playground

add below request in query windows

#### Create Short Links ####

## Request

mutation createShortUrl($input: CreateShortUrlInput!) {
  createShortUrl(createShortUrlInput: $input){
    id
    shortUrl
    fullUrl
  }
}

# Input Vars (i.e Query Variables) #

{
  "input": { "fullUrl": "https://nestjs.com"} 
}

# Expected Output Example #

{
  "data": {
    "createShortUrl": {
      "id": 1,
      "shortUrl": "Zv2lbn5o",
      "fullUrl": "https://nestjs.com"
    }
  }
}

![image](https://github.com/imsimransingh/short-url-app/assets/95456903/e5ee0824-a17c-47c6-a84b-169a119f446b)




## Fetch all short links along with redirect links ##

## Request

{
 {
  shortUrls(pageSize: 5, currentPage: 1) {
    id
    shortUrl
    fullUrl
    createdAt
    updatedAt
  }
}

## Expected Output

{
  "data": {
    "shortUrls": [
      {
        "id": 1,
        "shortUrl": "Zv2lbn5o",
        "fullUrl": "http://localhost:3000/redirect?url=Zv2lbn5o",
        "createdAt": "2024-04-25T21:38:11.511Z",
        "updatedAt": "2024-04-25T21:38:11.511Z"
      },
      {
        "id": 2,
        "shortUrl": "X8odwsQq",
        "fullUrl": "http://localhost:3000/redirect?url=X8odwsQq",
        "createdAt": "2024-04-25T22:53:34.254Z",
        "updatedAt": "2024-04-25T22:53:34.254Z"
      }
    ]
  }
}

![image](https://github.com/imsimransingh/short-url-app/assets/95456903/c89542da-d682-4078-a268-e0e8b479face)

### Find one url by ID ###

# Request
query fetchById($input: Int!) {
  shortUrl(id:$input) {
    id
    shortUrl
    fullUrl
  }
}
# Query Vars
{"input":1}

# Expected Output4

{
  "data": {
    "shortUrl": {
      "id": 1,
      "shortUrl": "Zv2lbn5o",
      "fullUrl": "https://nestjsssd22.com"
    }
  }
}

### Update Url by ID ###

# Request
mutation updateShortUrl($input: UpdateShortUrlInput!) {
  updateShortUrl(updateShortUrlInput: $input){
    id
    shortUrl
    fullUrl
  }
}
# Example Query Vars
{
  "input": {"id":1, "fullUrl": "https://www.facebook.com"} 
}

# Expected Output
{
  "data": {
    "updateShortUrl": {
      "id": 1,
      "shortUrl": "Zv2lbn5o",
      "fullUrl": "https://www.facebook.com"
    }
  }
}

![image](https://github.com/imsimransingh/short-url-app/assets/95456903/30eae183-6730-4703-9da4-4662a5420367)


#### NOTE ####

in above output `fullUrl` is redirect url, when we paste this url on browser it will take us to original url


## Run Test ##

run `npm run test`


### GraphQL Schema ####

#### Types

- ShortUrl
  - `id`: Integer - Unique identifier for the short URL.
  - `shortUrl`: String - The generated short URL.
  - `fullUrl`: String - The original URL.
  - `createdAt`: DateTime - The creation timestamp.
  - `updatedAt`: DateTime - The last update timestamp.

#### Inputs

- CreateShortUrlInput
  - `shortUrl`: String (optional) - The desired short URL.
  - `fullUrl`: String - The original URL that needs to be shortened.
  - `createdAt`: DateTime (optional) - The creation timestamp.
  - `updatedAt`: DateTime (optional) - The last update timestamp.

- UpdateShortUrlInput
  - Inherits all fields from `CreateShortUrlInput` and includes:
  - `id`: Integer - The unique identifier of the short URL to be updated.

#### Queries

- shortUrls
  - Retrieves a paginated list of all short URLs.
  - Parameters: `pageSize` (Float), `currentPage` (Float).

- shortUrl
  - Retrieves a single short URL by its ID.
  - Parameters: `id` (Int).

#### Mutations

- createShortUrl
  - Creates a new short URL entry.
  - Parameters: `createShortUrlInput` (CreateShortUrlInput).

- updateShortUrl
  - Updates an existing short URL.
  - Parameters: `updateShortUrlInput` (UpdateShortUrlInput).

- removeShortUrl
  - Deletes a short URL by its ID.
  - Parameters: `id` (Int).

#### Resolver

The `ShortUrlResolver` class in NestJS handles the GraphQL operations. It uses the `ShortUrlService` for business logic and data handling.

#### Please reach out to me if something is not documented/cleared/working @ singh.simran6065@gmail.com or +61 (0) 470 294 174 ####
