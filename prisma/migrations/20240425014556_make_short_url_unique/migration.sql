/*
  Warnings:

  - A unique constraint covering the columns `[shortUrl]` on the table `shortUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shortUrl_shortUrl_key" ON "shortUrl"("shortUrl");
