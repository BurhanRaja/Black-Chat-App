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

    const { directmessageId: messageId, conversationId } = req.query;
    const { content, fileUrl } = req.body;

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

    let message = await prisma.directMessage.findUnique({
      where: {
        directMessageId: messageId as string,
        conversationId: conversationId as string,
      },
      include: {
        user: true,
        reactions: true,
        replymessage: true,
      },
    });

    if (!message || message.isDelete) {
      return res.status(404).send({
        success,
        message: "Message not found",
      });
    }

    let user =
      conversation.profileOneId === profile.userId
        ? conversation.profileOne
        : conversation.profileTwo;

    let uniqueId = randomBytes(10).toString("hex");

    message = await prisma.directMessage.findUnique({
      where: {
        directMessageId: uniqueId,
      },
      include: {
        user: true,
        reactions: {
          include: {
            UserReaction: true,
          },
        },
        replymessage: {
          include: {
            user: true,
          },
        },
      },
    });

    if (message) {
      uniqueId += randomBytes(4).toString("hex");
    }

    let data = {
      content: content as string,
      file: fileUrl as string,
      directMessageId: uniqueId,
      replymessageId: messageId as string,
      replyuserId: profile.userId,
      conversationId: conversationId as string,
      isReply: true,
    };

    message = await prisma.directMessage.create({
      data,
      include: {
        user: true,
        replyuser: true,
        reactions: {
          include: {
            UserReaction: true,
          },
        },
        replymessage: {
          include: {
            user: true,
          },
        },
      },
    });

    success = true;
    res.socket.server.io.emit(
      `chat:${conversationId}:message`,
      undefined,
      message
    );
    return res.status(200).send({
      success,
      message,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
}
