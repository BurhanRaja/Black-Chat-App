/*
  Warnings:

  - You are about to drop the column `sUserId` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Reaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Reaction_sUserId_idx";

-- DropIndex
DROP INDEX "Reaction_userId_idx";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "sUserId",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_ProfileToReaction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReactionToSUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToReaction_AB_unique" ON "_ProfileToReaction"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToReaction_B_index" ON "_ProfileToReaction"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReactionToSUser_AB_unique" ON "_ReactionToSUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ReactionToSUser_B_index" ON "_ReactionToSUser"("B");
