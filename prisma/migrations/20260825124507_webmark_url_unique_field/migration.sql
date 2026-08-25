/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `webmarks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "webmarks_url_key" ON "webmarks"("url");
