/*
  Warnings:

  - You are about to drop the column `uniqueName` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[displayname]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayname` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Profile_uniqueName_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "uniqueName",
ADD COLUMN     "displayname" TEXT NOT NULL,
ADD COLUMN     "forgetPasswordToken" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "gender" INTEGER NOT NULL,
ALTER COLUMN "imageUrl" SET DEFAULT 'none',
ALTER COLUMN "bio" SET DEFAULT '',
ALTER COLUMN "emailVerified" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "type" SET DEFAULT 'TEXT';

-- AlterTable
ALTER TABLE "SUser" ALTER COLUMN "type" SET DEFAULT 'MEMBER';

-- CreateIndex
CREATE UNIQUE INDEX "Profile_displayname_key" ON "Profile"("displayname");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
