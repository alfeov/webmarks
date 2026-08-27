/*
  Warnings:

  - A unique constraint covering the columns `[url,user_id]` on the table `webmarks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "webmarks_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "webmarks_url_user_id_key" ON "webmarks"("url", "user_id");
