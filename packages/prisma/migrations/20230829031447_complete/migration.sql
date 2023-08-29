/*
  Warnings:

  - You are about to drop the column `access_role` on the `ChannelUserDetail` table. All the data in the column will be lost.
  - You are about to drop the column `access_roles` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `roomchatId` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessRole` to the `ChannelUserDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessRoles` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChannelUserDetail" DROP CONSTRAINT "ChannelUserDetail_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelUserDetail" DROP CONSTRAINT "ChannelUserDetail_userId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_channelId_fkey";

-- DropForeignKey
ALTER TABLE "UsersChannel" DROP CONSTRAINT "UsersChannel_userId_fkey";

-- DropIndex
DROP INDEX "Room_roomchatId_key";

-- DropIndex
DROP INDEX "UsersChannel_userId_key";

-- AlterTable
ALTER TABLE "ChannelUserDetail" DROP COLUMN "access_role",
ADD COLUMN     "accessRole" INTEGER NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "channelId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "access_roles",
DROP COLUMN "authorId",
DROP COLUMN "roomchatId",
ADD COLUMN     "accessRoles" INTEGER NOT NULL,
ADD COLUMN     "uniqueId" TEXT NOT NULL,
ALTER COLUMN "channelId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UsersChannel" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,
    "reply" BOOLEAN NOT NULL,
    "replyMessage" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "individualChatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualChat" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndividualChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChannelUserDetailToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Friends_uniqueId_key" ON "Friends"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Message_uniqueId_key" ON "Message"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualChat_uniqueId_key" ON "IndividualChat"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelUserDetailToRoom_AB_unique" ON "_ChannelUserDetailToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelUserDetailToRoom_B_index" ON "_ChannelUserDetailToRoom"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Room_uniqueId_key" ON "Room"("uniqueId");

-- AddForeignKey
ALTER TABLE "ChannelUserDetail" ADD CONSTRAINT "ChannelUserDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelUserDetail" ADD CONSTRAINT "ChannelUserDetail_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersChannel" ADD CONSTRAINT "UsersChannel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_individualChatId_fkey" FOREIGN KEY ("individualChatId") REFERENCES "IndividualChat"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelUserDetailToRoom" ADD CONSTRAINT "_ChannelUserDetailToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "ChannelUserDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelUserDetailToRoom" ADD CONSTRAINT "_ChannelUserDetailToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
