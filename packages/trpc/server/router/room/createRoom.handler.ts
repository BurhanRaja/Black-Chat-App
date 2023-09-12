import { TRPCError } from "@trpc/server";
import { TrpcSessionUser } from "../../createContext";
import { CreateRoomInput } from "./createRoom.schema";
import { prisma } from "database/src/client";
import { randomIdGenerator } from "lib";

type CreateRoomParams = {
  input: CreateRoomInput;
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const createRoom = async ({ input, ctx }: CreateRoomParams) => {
  const { name, channelId, roomType } = input;

  let channel = await prisma.channel.findUnique({
    where: {
      uniqueId: channelId,
    },
  });

  if (!channel) {
    return new TRPCError({
      code: "NOT_FOUND",
      message: "Channel not found.",
    });
  }

  let room = await prisma.room.findFirst({
    where: {
      channelId,
      name,
    },
  });

  if (room) {
    return new TRPCError({
      code: "BAD_REQUEST",
      message: "Room with this name already exists.",
    });
  }

  let roomUniqueId = randomIdGenerator();
  room = await prisma.room.findUnique({
    where: {
      uniqueId: roomUniqueId,
    },
  });

  if (room) {
    roomUniqueId += randomIdGenerator(3);
  }

  await prisma.room.create({
    data: {
      name,
      channelId,
      roomType,
      uniqueId: roomUniqueId,
    },
  });

  return {
    success: true,
    message: "Room created successfully.",
  };
};
