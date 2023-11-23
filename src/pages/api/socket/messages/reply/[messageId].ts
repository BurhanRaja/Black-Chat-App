import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { prisma } from "@/db/client";
import { decode } from "next-auth/jwt";
import { randomBytes } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  let success = false;
  if (req.method !== "POST") {
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
    const { content, fileUrl } = req.body;

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

    const checkPermission = room.messagePermission.includes(member?.type!);

    if (!checkPermission) {
      return res.status(400).send({
        success,
        message: "Permission denied.",
      });
    }

    let message = await prisma.message.findFirst({
      where: {
        messageId: messageId as string,
        roomId: roomId as string,
      },
      include: {
        replyuser: {
          include: {
            user: true,
          },
        },
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

    if (message.isDelete) {
      return res.status(404).send({
        success,
        message: "Message is deleted",
      });
    }

    let uniqueId = randomBytes(10).toString("hex");

    message = await prisma.message.findUnique({
      where: {
        messageId: uniqueId,
      },
      include: {
        replyuser: {
          include: {
            user: true,
          },
        },
        user: {
          include: {
            user: true,
          },
        },
        replymessage: true,
      },
    });

    if (message) {
      uniqueId += randomBytes(4).toString("hex");
    }

    let data = {
      content: content as string,
      file: fileUrl as string,
      messageId: uniqueId,
      replyuserId: member?.sUserId as string,
      roomId: roomId as string,
      replymessageId: messageId as string,
      isReply: true,
    };

    message = await prisma.message.create({
      data,
      include: {
        replyuser: {
          include: {
            user: true,
          },
        },
        user: {
          include: {
            user: true,
          },
        },
        replymessage: {
          include: {
            user: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    success = true;
    res.socket.server.io.emit(`chat:${roomId}:message`, message);
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
