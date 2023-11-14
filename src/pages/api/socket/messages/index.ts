import currentProfile from "@/lib/current-profile";
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
    const { serverId, roomId } = req.query;

    let server = await prisma.server.findUnique({
      where: {
        serverId: serverId as string,
      },
      include: {
        sUsers: true,
      },
    });

    if (!server) {
      return res.status(404).send({ success, message: "Server not found." });
    }

    let room = await prisma.room.findUnique({
      where: {
        roomId: roomId as string,
      },
    });

    if (!room) {
      return res.status(404).send({ success, message: "Room not found." });
    }

    let member = server.sUsers.find((user) => user.userId === profile.userId);
    const checkPermission = room.messagePermission.includes(member?.type!);

    if (!checkPermission) {
      return res.status(400).send({
        success,
        message: "Permission denied.",
      });
    }

    let uniqueId = randomBytes(10).toString("hex");

    let message = await prisma.message.findUnique({
      where: {
        messageId: uniqueId,
      },
    });

    if (message) {
      uniqueId += randomBytes(4).toString("hex");
    }

    let data = {
      content: content!,
      file: fileUrl!,
      messageId: uniqueId,
      sUserId: member?.sUserId!,
      replyuserId: "",
      roomId: roomId as string,
    };

    message = await prisma.message.create({
      data,
    });

    success = true;
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
