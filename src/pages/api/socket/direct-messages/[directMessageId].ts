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

    if (!profile?.userId) {
      return res.status(401).send({ success, message: "UnAuthorized" });
    }

    const { directMessageId, conversationId } = req.query;

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
      conversation.profileOneId === profile.userId
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
        conversationId: conversationId as string,
        directMessageId: directMessageId as string,
      },
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

    if (!message || message.isDelete) {
      return res.status(404).send({
        success,
        message: "Message not found",
      });
    }

    const isMessageOwner =
      message.userId === member.userId || message.replyuserId === member.userId;
    const canModify = isMessageOwner;

    if (!canModify) {
      return res.status(400).send({
        success,
        message: "Permission denied",
      });
    }

    if (req.method === "DELETE") {
      message = await prisma.directMessage.update({
        where: {
          directMessageId: directMessageId as string,
        },
        data: {
          file: null,
          content: "This content is deleted",
          isDelete: true,
        },
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
    }

    if (req.method === "PUT") {
      const { content } = req.body;
      message = await prisma.directMessage.update({
        where: {
          directMessageId: directMessageId as string,
        },
        data: {
          content: content,
        },
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
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
}
