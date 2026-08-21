/*
  Warnings:

  - You are about to drop the column `author` on the `webmarks` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `webmarks` table. All the data in the column will be lost.
  - Made the column `description` on table `webmarks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "webmarks" DROP COLUMN "author",
DROP COLUMN "publisher",
ALTER COLUMN "description" SET NOT NULL;
