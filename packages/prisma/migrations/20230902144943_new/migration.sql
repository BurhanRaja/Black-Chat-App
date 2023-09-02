-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "userId" SET DEFAULT '',
ALTER COLUMN "type" SET DEFAULT '',
ALTER COLUMN "provider" SET DEFAULT '',
ALTER COLUMN "providerAccountId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Channel" ALTER COLUMN "usersChannelId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ChannelUserDetail" ALTER COLUMN "channelId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Friends" ALTER COLUMN "senderId" SET DEFAULT '',
ALTER COLUMN "receiverId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "senderId" SET DEFAULT '',
ALTER COLUMN "receiverId" SET DEFAULT '',
ALTER COLUMN "roomId" SET DEFAULT '',
ALTER COLUMN "individualChatId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Notifications" ALTER COLUMN "userId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "channelId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "userId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DEFAULT '',
ALTER COLUMN "about" SET DEFAULT '';

-- AlterTable
ALTER TABLE "UsersChannel" ALTER COLUMN "userId" SET DEFAULT '';
