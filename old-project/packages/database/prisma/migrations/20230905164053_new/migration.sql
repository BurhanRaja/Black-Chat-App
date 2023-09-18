/*
  Warnings:

  - The `accessRole` column on the `ChannelUserDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `individualChatId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `replyMessage` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `IndividualChat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `replyMessageId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccessRole" AS ENUM ('ADMIN', 'MODERATOR', 'MEMBER', 'GUEST');

-- DropForeignKey
ALTER TABLE "ChannelUserDetail" DROP CONSTRAINT "ChannelUserDetail_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelUserDetail" DROP CONSTRAINT "ChannelUserDetail_userId_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_individualChatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersChannel" DROP CONSTRAINT "UsersChannel_userId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ChannelUserDetail" DROP COLUMN "accessRole",
ADD COLUMN     "accessRole" "AccessRole" NOT NULL DEFAULT 'GUEST';

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "individualChatId",
DROP COLUMN "message",
DROP COLUMN "receiverId",
DROP COLUMN "replyMessage",
DROP COLUMN "senderId",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "dMessageId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "replyMessageId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "access_roles" "AccessRole"[];

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "userId" DROP DEFAULT;

-- DropTable
DROP TABLE "IndividualChat";

-- CreateTable
CREATE TABLE "DirectMessage" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "userOneId" TEXT NOT NULL,
    "userTwoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DirectMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DirectMessage_uniqueId_key" ON "DirectMessage"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- AddForeignKey
ALTER TABLE "ChannelUserDetail" ADD CONSTRAINT "ChannelUserDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelUserDetail" ADD CONSTRAINT "ChannelUserDetail_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersChannel" ADD CONSTRAINT "UsersChannel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_replyMessageId_fkey" FOREIGN KEY ("replyMessageId") REFERENCES "Message"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dMessageId_fkey" FOREIGN KEY ("dMessageId") REFERENCES "DirectMessage"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_userOneId_fkey" FOREIGN KEY ("userOneId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_userTwoId_fkey" FOREIGN KEY ("userTwoId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;
