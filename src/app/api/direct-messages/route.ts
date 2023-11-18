import currentProfile from "@/lib/current-profile";
import { DirectMessage } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

const MESSAGE_BATCH = 10;

export async function GET(req: NextRequest) {
  let success = false;

  try {
    const profile = await currentProfile();

    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");
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

    if (!conversationId) {
      return NextResponse.json(
        {
          success,
          message: "Room Id not found.",
        },
        { status: 400 }
      );
    }

    let messages: DirectMessage[] = [];

    if (cursor) {
      messages = await prisma.directMessage.findMany({
        take: MESSAGE_BATCH,
        skip: 1,
        cursor: {
          directMessageId: cursor!,
        },
        where: {
          conversationId: conversationId!,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await prisma.directMessage.findMany({
        take: MESSAGE_BATCH,
        skip: 0,
        where: {
          conversationId: conversationId!,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;
    if (messages.length === MESSAGE_BATCH) {
      nextCursor = messages[MESSAGE_BATCH - 1].directMessageId;
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
