/*
  Warnings:

  - The values [MODERATOR] on the enum `AccessRole` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[image]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forgetPasswordToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccessRole_new" AS ENUM ('ADMIN', 'MEMBER', 'GUEST');
ALTER TABLE "ChannelUserDetail" ALTER COLUMN "accessRole" DROP DEFAULT;
ALTER TABLE "ChannelUserDetail" ALTER COLUMN "accessRole" TYPE "AccessRole_new" USING ("accessRole"::text::"AccessRole_new");
ALTER TABLE "Room" ALTER COLUMN "accessRoles" TYPE "AccessRole_new"[] USING ("accessRoles"::text::"AccessRole_new"[]);
ALTER TYPE "AccessRole" RENAME TO "AccessRole_old";
ALTER TYPE "AccessRole_new" RENAME TO "AccessRole";
DROP TYPE "AccessRole_old";
ALTER TABLE "ChannelUserDetail" ALTER COLUMN "accessRole" SET DEFAULT 'GUEST';
COMMIT;

-- AlterEnum
ALTER TYPE "ChannelType" ADD VALUE 'GENERAL';

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "forgetPasswordToken" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_image_key" ON "Channel"("image");

-- CreateIndex
CREATE UNIQUE INDEX "User_image_key" ON "User"("image");
