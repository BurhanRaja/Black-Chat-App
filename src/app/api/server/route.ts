import currentProfile from "@/lib/current-profile";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { RoomType, SUserRole } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { createServer } from "@/types";

export async function POST(req: NextRequest): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;

  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { success, message: "UnAuthorized" },
        { status: 401 }
      );
    }

    if (!profile.emailVerified) {
      return NextResponse.json(
        { success, message: "Please Verify your Email first." },
        { status: 400 }
      );
    }

    const bodyData = await req.json();
    const validation = createServer.safeParse(bodyData);
    if (!validation.success) {
      const { errors } = validation.error;
      return NextResponse.json(
        {
          success,
          message: errors[0]?.message,
        },
        { status: 406 }
      );
    }

    const { imageUrl, name } = bodyData;

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

    let inviteCode = uuidV4();

    let data = {
      name,
      imageUrl,
      serverId: uniqueId,
      inviteCode,
      ownerId: profile?.userId!,
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
      serverId: server.serverId,
      userId: profile?.userId!,
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
    const profile = await currentProfile();

    let ownedServer = await prisma.server.findMany({
      where: {
        ownerId: profile?.userId!,
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
            userId: profile?.userId!,
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
            userId: profile?.userId!,
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
