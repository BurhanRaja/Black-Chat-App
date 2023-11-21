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

    const { messageId, roomId, serverId } = req.query;
    const { reactionStr } = req.body;

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

    // Check for message
    let message = await prisma.message.findUnique({
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
        reactions: true,
      },
    });

    if (!message || message.isDelete) {
      return res.status(404).send({
        success,
        message: "Message not found",
      });
    }

    // Get Server User
    let sUser = await prisma.sUser.findFirst({
      where: {
        userId: profile.userId,
      },
    });

    // Check Reaction
    let reaction = await prisma.reaction.findFirst({
      where: {
        reaction: reactionStr as string,
        messageId: messageId as string,
      },
    });

    if (reaction) {
      // Check for User's Reaction given before
      let userReaction = await prisma.userReaction.findFirst({
        where: {
          reactionId: reaction?.reactionId,
          sUserId: sUser?.sUserId,
        },
      });

      if (userReaction) {
        // If yes then delete the User's Reaction and Reduce the Reaction count
        await prisma.userReaction.delete({
          where: {
            id: userReaction.id,
            reactionId: reaction.reactionId,
            sUserId: sUser?.sUserId!,
          },
        });
        reaction = await prisma.reaction.update({
          data: {
            count: reaction.count - 1,
          },
          where: {
            id: reaction.id,
            reaction: reactionStr as string,
            messageId: messageId as string,
          },
        });
      } else {
        // If no then create the Reaction with count 1 and Create the User's Reaction
        reaction = await prisma.reaction.update({
          data: {
            count: reaction.count + 1,
          },
          where: {
            id: reaction.id,
            reaction: reactionStr as string,
            messageId: messageId as string,
          },
        });
        await prisma.userReaction.create({
          data: {
            reactionId: reaction.reactionId,
            sUserId: sUser!.sUserId,
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
          messageId: messageId as string,
          count: 1,
        },
      });
      await prisma.userReaction.create({
        data: {
          reactionId: reaction.reactionId,
          sUserId: sUser!.sUserId,
          id: uuid(),
        },
      });
    }

    message = await prisma.message.findUnique({
      where: {
        messageId: messageId as string,
      },
      include: {
        user: {
          include: {
            user: true,
          },
        },
        reactions: {
          include: {
            UserReaction: true,
          },
        },
      },
    });

    res.socket.server.io.emit(`chat:${roomId}:message:update`, message);

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
