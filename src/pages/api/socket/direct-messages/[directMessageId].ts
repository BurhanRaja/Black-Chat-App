import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { prisma } from "@/db/client";
import { decode } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  let success = false;
  if (req.method !== "DELETE" && req.method !== "PUT") {
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

    const { messageId, conversationId } = req.query;

    let conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId as string,
      },
      include: {
        profileOne: true,
        profileTwo: true,
      },
    });

    if (!conversation) {
      return res.status(404).send({
        success,
        message: "Server not found.",
      });
    }

    const member =
      conversation.profileOne.userId === profile.userId
        ? conversation.profileOne
        : conversation.profileTwo;

    if (!member) {
      return res.status(404).send({
        success,
        message: "Member not found.",
      });
    }

    let message = await prisma.directMessage.findUnique({
      where: {
        id: conversationId as string,
      },
      include: {
        user: true,
      },
    });

    if (!message || message.isDelete) {
      return res.status(404).send({
        success,
        message: "Message not found",
      });
    }

    const isMessageOwner = message.userId === member.userId;
    const canModify = isMessageOwner;

    if (!canModify) {
      return res.status(401).send({
        success,
        message: "UnAuthorized",
      });
    }

    if (req.method === "DELETE") {
      message = await prisma.directMessage.update({
        where: {
          directMessageId: message.directMessageId,
        },
        data: {
          file: null,
          content: "This content is deleted",
          isDelete: true,
        },
        include: {
          user: true,
        },
      });
    }

    if (req.method === "PUT") {
      const { content } = req.body;
      message = await prisma.directMessage.update({
        where: {
          directMessageId: message.directMessageId,
        },
        data: {
          content: content,
        },
        include: {
          user: true,
        },
      });
    }

    success = true;
    res.socket.server.io.emit(
      `chat:${conversationId}:message:update`,
      undefined,
      message
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
