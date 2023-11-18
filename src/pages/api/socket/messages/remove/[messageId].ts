import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { prisma } from "@/db/client";
import { decode } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  let success = false;
  if (req.method !== "DELETE") {
    return res.status(405).send({ success, message: "Method not Allowed." });
  }

  try {
    let sessionToken = req.cookies["next-auth.session-token"];

    const profileData = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    const profile = await prisma.profile.findUnique({
      where: {
        userId: profileData?.userId,
      },
    });

    if (!profile) {
      return res.status(401).send({ success, message: "UnAuthorized" });
    }

    const { messageId, serverId, roomId } = req.query;

    let server = await prisma.server.findUnique({
      where: {
        serverId: serverId as string,
      },
      include: {
        sUsers: true,
      },
    });

    if (!server) {
      return res.status(404).send({
        success,
        message: "Server not found.",
      });
    }

    let room = await prisma.room.findUnique({
      where: {
        roomId: roomId as string,
        serverId: serverId as string,
      },
    });

    if (!room) {
      return res.status(404).send({
        success,
        message: "Room not found.",
      });
    }

    const member = server.sUsers.find((user) => user.userId === profile.userId);

    if (!member) {
      return res.status(404).send({
        success,
        message: "Member not found.",
      });
    }

    console.log(messageId);

    let message = await prisma.message.findFirst({
      where: {
        messageId: messageId as string,
        roomId: roomId as string,
      },
      include: {
        user: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!message) {
      return res.status(404).send({
        success,
        message: "Message not found",
      });
    }

    if (!message.isDelete) {
      return res.status(404).send({
        success,
        message: "Message is not deleted",
      });
    }

    const isMessageOwner = message.sUserId === member.sUserId;
    const isAdmin = member.type === "ADMIN";
    const isModerator = member.type === "MODERATOR";
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return res.status(401).send({
        success,
        message: "UnAuthorized",
      });
    }

    message = await prisma.message.delete({
      where: {
        messageId: messageId as string,
        roomId: roomId as string,
      },
      include: {
        user: {
          include: {
            user: true,
          },
        },
      },
    });

    res.socket.server.io.emit(
      `chat:${roomId}:message:update`,
      message,
      undefined,
      true
    );
    return res.status(200).send({
      success,
      message,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
}
