/*
  Warnings:

  - Added the required column `roomCatId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "roomCatId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RoomCategory" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "RoomCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomCategory_uniqueId_key" ON "RoomCategory"("uniqueId");

-- AddForeignKey
ALTER TABLE "RoomCategory" ADD CONSTRAINT "RoomCategory_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_roomCatId_fkey" FOREIGN KEY ("roomCatId") REFERENCES "RoomCategory"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;
