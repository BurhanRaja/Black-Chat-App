/*
  Warnings:

  - You are about to drop the column `profileId` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `sUserId` on the `Reaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reactionId]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `count` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reactionId` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Reaction_profileId_idx";

-- DropIndex
DROP INDEX "Reaction_sUserId_idx";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "profileId",
DROP COLUMN "sUserId",
ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reactionId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "UserReaction" (
    "id" TEXT NOT NULL,
    "reactionId" TEXT NOT NULL,
    "profileId" TEXT,
    "sUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserReaction_sUserId_idx" ON "UserReaction"("sUserId");

-- CreateIndex
CREATE INDEX "UserReaction_profileId_idx" ON "UserReaction"("profileId");

-- CreateIndex
CREATE INDEX "UserReaction_reactionId_idx" ON "UserReaction"("reactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_reactionId_key" ON "Reaction"("reactionId");
