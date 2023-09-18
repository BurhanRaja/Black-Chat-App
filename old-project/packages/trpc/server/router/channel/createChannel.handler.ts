import { prisma } from "database/src/client";
import { CreateChannelInput } from "./createChannel.schema";
import { AccessRole, RoomType } from "@prisma/client";
import { randomIdGenerator } from "lib";
import { TrpcSessionUser } from "../../createContext";

type ChangePasswordOptions = {
  input: CreateChannelInput;
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const createChannel = async ({ input, ctx }: ChangePasswordOptions) => {
  const { name, channelType, channelFor } = input;
  const { user } = ctx;

  // Create User's Channel Row to Add Channel in them
  let userChannelUniqueId = randomIdGenerator();
  // - Check if user's channel with this unique id is present
  let userChannel = await prisma.usersChannel.findFirst({
    where: {
      uniqueId: userChannelUniqueId,
    },
  });
  if (userChannel) {
    userChannelUniqueId += randomIdGenerator(3);
  }
  userChannel = await prisma.usersChannel.create({
    data: {
      userId: user.uniqueId,
      uniqueId: userChannelUniqueId,
    },
  });

  // Create Channel of the User
  let channelUniqueId = randomIdGenerator();
  let channel = await prisma.channel.findFirst({
    where: {
      uniqueId: channelUniqueId,
    },
  });
  if (channel) {
    channelUniqueId += randomIdGenerator(3);
  }
  const invitecode = name + channelUniqueId;
  channel = await prisma.channel.create({
    data: {
      usersChannelId: userChannel.uniqueId,
      uniqueId: channelUniqueId,
      name,
      channelType,
      inviteCode: invitecode,
      channelFor,
    },
  });

  // Check for Channel User Details
  let userChannelDetails = await prisma.channelUserDetail.findFirst({
    where: {
      userId: user.uniqueId,
      channelId: channel.uniqueId,
    },
  });
  if (!userChannelDetails) {
    userChannelDetails = await prisma.channelUserDetail.create({
      data: {
        userId: user.uniqueId,
        channelId: channel.uniqueId,
        join_type: 0,
        accessRole: AccessRole.ADMIN,
      },
    });
  }

  // Create Room Category and add it to room

  // Create General Default Room
  let roomUniqueId = randomIdGenerator();
  let room = await prisma.room.findFirst({
    where: {
      uniqueId: roomUniqueId,
    },
  });
  if (room) {
    roomUniqueId += randomIdGenerator(3);
  }
  room = await prisma.room.create({
    data: {
      uniqueId: roomUniqueId,
      name: "General",
      channelId: channel.uniqueId,
      roomType: RoomType.CHAT,
      accessRoles: [
        AccessRole.ADMIN,
        AccessRole.GUEST,
        AccessRole.MEMBER,
        AccessRole.MODERATOR,
      ],
    },
  });

  return {
    success: true,
    message: "Channel created successfully.",
  };
};
