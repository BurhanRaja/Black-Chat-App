import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { prisma } from "@/db/client";
import { randomBytes } from "crypto";
import { decode } from "next-auth/jwt";

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

    const { content, fileUrl } = req.body;
    const { conversationId } = req.query;

    let conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId as string,
      },
    });

    if (!conversation) {
      return res
        .status(404)
        .send({ success, message: "Conversation not found." });
    }

    let uniqueId = randomBytes(10).toString("hex");

    let directMessage = await prisma.directMessage.findUnique({
      where: {
        directMessageId: uniqueId,
      },
      include: {
        user: true,
      },
    });

    if (directMessage) {
      uniqueId += randomBytes(4).toString("hex");
    }

    let data = {
      content: content as string,
      file: fileUrl as string,
      directMessageId: uniqueId,
      userId: profile.userId,
      replyuserId: "",
      conversationId: conversationId as string,
    };

    directMessage = await prisma.directMessage.create({
      data,
      include: {
        user: true,
      },
    });

    res.socket.server.io.emit(
      `chat:${conversationId!}:message`,
      undefined,
      directMessage
    );

    success = true;
    return res.status(200).send({
      success,
      directMessage,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
}
