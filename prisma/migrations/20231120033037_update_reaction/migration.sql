/*
  Warnings:

  - You are about to drop the column `count` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the `_ProfileToReaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ReactionToSUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "count",
ADD COLUMN     "profileId" TEXT,
ADD COLUMN     "sUserId" TEXT;

-- DropTable
DROP TABLE "_ProfileToReaction";

-- DropTable
DROP TABLE "_ReactionToSUser";

-- CreateIndex
CREATE INDEX "Reaction_sUserId_idx" ON "Reaction"("sUserId");

-- CreateIndex
CREATE INDEX "Reaction_profileId_idx" ON "Reaction"("profileId");
