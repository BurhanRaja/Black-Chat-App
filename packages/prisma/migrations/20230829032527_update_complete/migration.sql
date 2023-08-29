/*
  Warnings:

  - You are about to drop the column `authorId` on the `Channel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueId]` on the table `UsersChannel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueId` to the `UsersChannel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_usersChannelId_fkey";

-- DropIndex
DROP INDEX "Channel_authorId_key";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "authorId",
ALTER COLUMN "usersChannelId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "channelId" INTEGER;

-- AlterTable
ALTER TABLE "UsersChannel" ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UsersChannel_uniqueId_key" ON "UsersChannel"("uniqueId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_usersChannelId_fkey" FOREIGN KEY ("usersChannelId") REFERENCES "UsersChannel"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;
