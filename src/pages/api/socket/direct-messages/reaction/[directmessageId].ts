import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { prisma } from "@/db/client";
import { decode } from "next-auth/jwt";
import { v4 as uuid } from "uuid";
import { randomBytes } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  let success = false;
  if (req.method !== "PUT") {
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
    const { reactionStr } = req.body;

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

    // Check for message
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

    // Check Reaction
    let reaction = await prisma.reaction.findFirst({
      where: {
        reaction: reactionStr as string,
        directMessageId: messageId as string,
      },
    });

    if (reaction) {
      // Check for User's Reaction given before
      let userReaction = await prisma.userReaction.findFirst({
        where: {
          reactionId: reaction?.reactionId,
          profileId: user.userId,
        },
      });

      if (userReaction) {
        // If yes then delete the User's Reaction and Reduce the Reaction count
        await prisma.userReaction.delete({
          where: {
            id: userReaction.id,
            reactionId: reaction.reactionId,
            profileId: user?.userId!,
          },
        });
        if (reaction.count === 1) {
          reaction = await prisma.reaction.delete({
            where: {
              id: reaction.id,
              reaction: reactionStr as string,
              directMessageId: messageId as string,
            },
          });
        } else {
          reaction = await prisma.reaction.update({
            data: {
              count: reaction.count - 1,
            },
            where: {
              id: reaction.id,
              reaction: reactionStr as string,
              directMessageId: messageId as string,
            },
          });
        }
      } else {
        // If no then create the Reaction with count 1 and Create the User's Reaction
        reaction = await prisma.reaction.update({
          data: {
            count: reaction.count + 1,
          },
          where: {
            id: reaction.id,
            reaction: reactionStr as string,
            directMessageId: messageId as string,
          },
        });
        await prisma.userReaction.create({
          data: {
            reactionId: reaction.reactionId,
            profileId: user?.userId,
            id: uuid(),
          },
        });
      }
    } else {
      let uniqueId = randomBytes(10).toString("hex");
      let reactCheck = await prisma.reaction.findUnique({
        where: {
          reactionId: uniqueId,
        },
      });

      if (reactCheck) {
        uniqueId += randomBytes(4).toString("hex");
      }

      reaction = await prisma.reaction.create({
        data: {
          id: uuid(),
          reactionId: uniqueId,
          reaction: reactionStr as string,
          directMessageId: messageId as string,
          count: 1,
        },
      });
      await prisma.userReaction.create({
        data: {
          reactionId: reaction.reactionId,
          profileId: user?.userId,
          id: uuid(),
        },
      });
    }

    message = await prisma.directMessage.findUnique({
      where: {
        directMessageId: messageId as string,
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

    console.log(message?.reactions);

    res.socket.server.io.emit(
      `chat:${conversationId}:message:update`,
      undefined,
      message
    );

    success = true;
    return res.status(200).send({
      success,
      message: "Reaction added to message.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
}
