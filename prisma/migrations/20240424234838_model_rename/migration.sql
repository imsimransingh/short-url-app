/*
  Warnings:

  - You are about to drop the `ShortUrl` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ShortUrl";

-- CreateTable
CREATE TABLE "shortUrl" (
    "id" SERIAL NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "fullUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shortUrl_pkey" PRIMARY KEY ("id")
);
