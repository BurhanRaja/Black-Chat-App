/*
  Warnings:

  - Added the required column `userId` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isReply` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `replyuserId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DirectMessage" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "isReply" BOOLEAN NOT NULL,
ADD COLUMN     "replyuserId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "reaction" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "sUserId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "directMessageId" TEXT NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Reaction_sUserId_idx" ON "Reaction"("sUserId");

-- CreateIndex
CREATE INDEX "Reaction_messageId_idx" ON "Reaction"("messageId");

-- CreateIndex
CREATE INDEX "Reaction_directMessageId_idx" ON "Reaction"("directMessageId");

-- CreateIndex
CREATE INDEX "Reaction_userId_idx" ON "Reaction"("userId");

-- CreateIndex
CREATE INDEX "DirectMessage_userId_idx" ON "DirectMessage"("userId");

-- CreateIndex
CREATE INDEX "Message_replyuserId_idx" ON "Message"("replyuserId");
