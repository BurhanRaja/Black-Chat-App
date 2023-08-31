/*
  Warnings:

  - You are about to drop the column `channelId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_channelId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "channelId",
ADD COLUMN     "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFactorEnable" BOOLEAN NOT NULL DEFAULT false;
