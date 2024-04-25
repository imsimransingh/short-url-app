/*
  Warnings:

  - Added the required column `fullUrl` to the `ShortUrl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShortUrl" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fullUrl" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
