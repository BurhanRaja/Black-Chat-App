-- CreateEnum
CREATE TYPE "AccessRole" AS ENUM ('ADMIN', 'MEMBER', 'GUEST');

-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('GAMING', 'MUSIC', 'EDUCATION', 'SCIENCEANDTECH', 'ENTERTAINMENT', 'GENERAL');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('CHAT', 'ANOUNCEMENT', 'VOICE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "about" TEXT NOT NULL DEFAULT '',
    "disable" BOOLEAN NOT NULL DEFAULT false,
    "forgetPasswordToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',
    "provider" TEXT NOT NULL DEFAULT '',
    "providerAccountId" TEXT NOT NULL DEFAULT '',
    "refresh_token" TEXT,
    "refresh_token_expires_in" INTEGER,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ChannelUserDetail" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "accessRole" "AccessRole" NOT NULL DEFAULT 'GUEST',
    "join_type" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChannelUserDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersChannel" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL DEFAULT '',
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "usersChannelId" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "channelType" "ChannelType" NOT NULL,
    "channelFor" INTEGER NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomCategory" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "RoomCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channelId" TEXT NOT NULL DEFAULT '',
    "accessRoles" "AccessRole"[],
    "roomType" "RoomType" NOT NULL,
    "roomCatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "senderId" TEXT NOT NULL DEFAULT '',
    "receiverId" TEXT NOT NULL DEFAULT '',
    "status" BOOLEAN NOT NULL DEFAULT false,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,
    "reply" BOOLEAN NOT NULL,
    "replyMessageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL DEFAULT '',
    "dMessageId" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectMessage" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "userOneId" TEXT NOT NULL,
    "userTwoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DirectMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_uniqueId_key" ON "User"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "User_image_key" ON "User"("image");

-- CreateIndex
CREATE UNIQUE INDEX "User_forgetPasswordToken_key" ON "User"("forgetPasswordToken");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "UsersChannel_uniqueId_key" ON "UsersChannel"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_uniqueId_key" ON "Channel"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_image_key" ON "Channel"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_inviteCode_key" ON "Channel"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "RoomCategory_uniqueId_key" ON "RoomCategory"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_uniqueId_key" ON "Room"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Friends_uniqueId_key" ON "Friends"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Message_uniqueId_key" ON "Message"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "DirectMessage_uniqueId_key" ON "DirectMessage"("uniqueId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelUserDetail" ADD CONSTRAINT "ChannelUserDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelUserDetail" ADD CONSTRAINT "ChannelUserDetail_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersChannel" ADD CONSTRAINT "UsersChannel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_usersChannelId_fkey" FOREIGN KEY ("usersChannelId") REFERENCES "UsersChannel"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomCategory" ADD CONSTRAINT "RoomCategory_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_roomCatId_fkey" FOREIGN KEY ("roomCatId") REFERENCES "RoomCategory"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_replyMessageId_fkey" FOREIGN KEY ("replyMessageId") REFERENCES "Message"("uniqueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dMessageId_fkey" FOREIGN KEY ("dMessageId") REFERENCES "DirectMessage"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_userOneId_fkey" FOREIGN KEY ("userOneId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_userTwoId_fkey" FOREIGN KEY ("userTwoId") REFERENCES "User"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;
