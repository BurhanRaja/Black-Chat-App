import { prisma } from "@/db/client";
import { v4 as uuid } from "uuid";

export const findConversation = async (
  profileOneId: string,
  profileTwoId: string
) => {
  try {
    return await prisma.conversation.findFirst({
      where: {
        profileOneId,
        profileTwoId,
      },
      include: {
        profileOne: true,
        profileTwo: true,
      },
    });
  } catch (err) {
    return null;
  }
};

export const createConversation = async (
  profileOneId: string,
  profileTwoId: string
) => {
  try {
    let id = uuid();
    let conversation = await prisma.conversation.findFirst({
      where: {
        id,
      },
    });
    if (conversation) {
      id = uuid();
    }

    return await prisma.conversation.create({
      data: {
        id,
        profileOneId,
        profileTwoId,
      },
      include: {
        profileOne: true,
        profileTwo: true,
      },
    });
  } catch (err) {
    return null;
  }
};
