import currentProfile from "@/lib/current-profile";
import { Message } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

const MESSAGE_BATCH = 10;

export async function GET(req: NextRequest) {
  let success = false;

  try {
    const profile = await currentProfile();

    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const cursor = searchParams.get("cursor");

    if (!profile) {
      return NextResponse.json(
        {
          success,
          message: "UnAuthorized",
        },
        { status: 401 }
      );
    }

    if (!roomId) {
      return NextResponse.json(
        {
          success,
          message: "Room Id not found.",
        },
        { status: 400 }
      );
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await prisma.message.findMany({
        take: MESSAGE_BATCH,
        skip: 1,
        cursor: {
          messageId: cursor!,
        },
        where: {
          roomId: roomId!,
        },
        include: {
          user: {
            include: {
              user: true,
            },
          },
          replyuser: {
            include: {
              user: true,
            },
          },
          reactions: {
            include: {
              UserReaction: true,
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
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await prisma.message.findMany({
        take: MESSAGE_BATCH,
        skip: 0,
        where: {
          roomId: roomId!,
        },
        include: {
          user: {
            include: {
              user: true,
            },
          },
          replyuser: {
            include: {
              user: true,
            },
          },
          reactions: {
            include: {
              UserReaction: true,
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
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;
    if (messages.length === MESSAGE_BATCH) {
      nextCursor = messages[MESSAGE_BATCH - 1].messageId;
    }

    success = true;
    return NextResponse.json({ items: messages, nextCursor });
  } catch (err) {
    return NextResponse.json(
      {
        success,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
