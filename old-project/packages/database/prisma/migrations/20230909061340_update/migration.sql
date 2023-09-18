/*
  Warnings:

  - You are about to drop the column `access_roles` on the `Room` table. All the data in the column will be lost.
  - The `accessRoles` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_ChannelUserDetailToRoom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channelFor` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelType` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('GAMING', 'MUSIC', 'EDUCATION', 'SCIENCEANDTECH', 'ENTERTAINMENT');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('CHAT', 'ANOUNCEMENT', 'VOICE');

-- DropForeignKey
ALTER TABLE "_ChannelUserDetailToRoom" DROP CONSTRAINT "_ChannelUserDetailToRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelUserDetailToRoom" DROP CONSTRAINT "_ChannelUserDetailToRoom_B_fkey";

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "channelFor" INTEGER NOT NULL,
ADD COLUMN     "channelType" "ChannelType" NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "access_roles",
ADD COLUMN     "roomType" "RoomType" NOT NULL,
DROP COLUMN "accessRoles",
ADD COLUMN     "accessRoles" "AccessRole"[];

-- DropTable
DROP TABLE "_ChannelUserDetailToRoom";
