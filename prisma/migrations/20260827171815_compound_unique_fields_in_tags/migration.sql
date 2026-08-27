/*
  Warnings:

  - A unique constraint covering the columns `[title,user_id]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tags_title_user_id_key" ON "tags"("title", "user_id");
