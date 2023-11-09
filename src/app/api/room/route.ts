import { createRoom } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodIssue } from "zod";
import { prisma } from "@/db/client";
import { randomBytes } from "crypto";
import { SUserRole } from "@prisma/client";
import currentProfile from "@/lib/current-profile";

export async function POST(req: NextRequest): Promise<
  | NextResponse<{
      success: boolean;
      message?: string;
      error?: ZodIssue[];
    }>
  | undefined
> {
  let success = false;

  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { success, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const validation = createRoom.safeParse(req.body);

    if (!validation.success) {
      const { errors } = validation.error;

      return NextResponse.json({ success, error: errors }, { status: 400 });
    }

    const { name, type, serverId, isPrivate } = validation.data;

    let sUser = await prisma.sUser.findFirst({
      where: {
        serverId,
        userId: profile?.userId,
        OR: [
          {
            type: SUserRole["ADMIN"],
          },
          {
            type: SUserRole["MODERATOR"],
          },
        ],
      },
    });

    if (!sUser) {
      return NextResponse.json(
        { success, message: "Forbidden" },
        { status: 403 }
      );
    }

    let room = await prisma.room.findFirst({
      where: {
        name,
        serverId,
      },
    });

    if (room) {
      return NextResponse.json(
        { success, message: "Room with this name already exists." },
        { status: 400 }
      );
    }

    let uniqueId = randomBytes(15).toString("hex");

    room = await prisma.room.findUnique({
      where: {
        roomId: uniqueId,
      },
    });

    if (room) {
      uniqueId += randomBytes(3).toString("hex");
    }

    let data = {
      name,
      type,
      serverId,
      roomId: uniqueId,
      default: false,
      isPrivate,
      updatePermission: [SUserRole["ADMIN"]],
      deletePermission: [SUserRole["ADMIN"]],
      messagePermission: [
        SUserRole["ADMIN"],
        SUserRole["MODERATOR"],
        SUserRole["MEMBER"],
      ],
    };

    await prisma.room.create({
      data,
    });

    success = true;
    return NextResponse.json(
      { success, message: "Successfully Created." },
      { status: 200 }
    );
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
