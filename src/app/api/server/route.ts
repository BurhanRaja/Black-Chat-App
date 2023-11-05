import currentProfile from "@/lib/current-profile";
import { encryptToken } from "@/lib/encrypt-decrypt";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { RoomType, SUserRole } from "@prisma/client";

export async function POST(req: NextRequest): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;

  try {
    const { imageUrl, name } = await req.json();

    const user = await currentProfile();

    let server = await prisma.server.findUnique({
      where: {
        name,
      },
    });

    if (server) {
      return NextResponse.json(
        { success, message: "Choose a unique name for your Server." },
        { status: 400 }
      );
    }

    let uniqueId = randomBytes(15).toString("hex");

    server = await prisma.server.findUnique({
      where: {
        serverId: uniqueId,
      },
    });

    if (server) {
      uniqueId += randomBytes(4).toString("hex");
    }

    let inviteCode = encryptToken(name + "-" + uniqueId);

    let data = {
      name,
      imageUrl,
      serverId: uniqueId,
      inviteCode,
      ownerId: user?.userId!,
    };

    server = await prisma.server.create({
      data,
    });

    let userUniqueId = randomBytes(12).toString("hex");
    let sUser = await prisma.sUser.findUnique({
      where: {
        sUserId: userUniqueId,
      },
    });

    if (sUser) {
      userUniqueId += randomBytes(3).toString("hex");
    }

    let sUserData = {
      sUserId: userUniqueId,
      type: SUserRole["ADMIN"],
      serverId: server.id,
      userId: user?.userId!,
    };

    await prisma.sUser.create({
      data: sUserData,
    });

    // Create Room Also "General"
    let roomUniqueId = randomBytes(15).toString("hex");
    let room = await prisma.room.findUnique({
      where: {
        roomId: roomUniqueId,
      },
    });

    if (room) {
      roomUniqueId += randomBytes(3).toString("hex");
    }

    let roomData = {
      name: "general",
      roomId: roomUniqueId,
      type: RoomType["TEXT"],
      serverId: server.serverId,
      updatePermission: [SUserRole["ADMIN"]],
      deletePermission: [SUserRole["ADMIN"]],
      messagePermission: [
        SUserRole["ADMIN"],
        SUserRole["MODERATOR"],
        SUserRole["MEMBER"],
      ],
      privatePermission: [],
      isPrivate: false,
      default: true,
    };
    await prisma.room.create({
      data: roomData,
    });

    success = true;
    return NextResponse.json(
      { success, message: "Server created successfully." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success, message: "Interval Server Error." },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<
  | NextResponse<{
      success: boolean;
      message?: string;
      data?: any;
    }>
  | undefined
> {
  let success = false;

  try {
    const user = await currentProfile();

    let ownedServer = await prisma.server.findMany({
      where: {
        ownerId: user?.userId!,
        rooms: {
          some: {
            default: true,
          },
        },
      },
      include: {
        rooms: true,
      },
    });

    let memberServer = await prisma.server.findMany({
      where: {
        sUsers: {
          some: {
            userId: user?.userId!,
            type: SUserRole["MEMBER"],
          },
        },
        rooms: {
          some: {
            default: true,
          },
        },
      },
      include: {
        rooms: true,
      },
    });

    let moderatorServer = await prisma.server.findMany({
      where: {
        sUsers: {
          some: {
            userId: user?.userId!,
            type: SUserRole["MODERATOR"],
          },
        },
        rooms: {
          some: {
            default: true,
          },
        },
      },
      include: {
        rooms: true,
      },
    });

    let allServers = [...ownedServer, ...moderatorServer, ...memberServer];

    success = true;
    return NextResponse.json({ success, data: allServers }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success, message: "Interval Server Error." },
      { status: 500 }
    );
  }
}
