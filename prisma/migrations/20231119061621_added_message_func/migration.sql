-- AlterTable
ALTER TABLE "DirectMessage" ADD COLUMN     "replymessageId" TEXT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "replymessageId" TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "connected" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "DirectMessage_replymessageId_idx" ON "DirectMessage"("replymessageId");

-- CreateIndex
CREATE INDEX "Message_replymessageId_idx" ON "Message"("replymessageId");
