import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import currentProfile from "@/lib/current-profile";

export async function GET(
  req: NextRequest,
  { params }: { params: { serverId: string } }
): Promise<
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

    if (!profile) {
      return NextResponse.json(
        { success, message: "UnAuthenticated" },
        { status: 401 }
      );
    }

    const { serverId } = params;

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") as string;

    let server = await prisma.server.findUnique({
      where: {
        serverId,
      },
      include: {
        rooms: true,
        sUsers: true,
      },
    });

    if (!server) {
      return NextResponse.json(
        { success, message: "Server not found" },
        { status: 404 }
      );
    }

    let member = server.sUsers.find((sUser) => sUser.userId === profile.userId);

    if (!member) {
      return NextResponse.json(
        { success, message: "Permission denied" },
        { status: 403 }
      );
    }

    let messageSearch = prisma.message.findMany({
      where: {
        roomId: { in: server.rooms.map((room) => room.id) },
        content: {
          contains: search,
        },
      },
      include: {
        user: {
          include: {
            user: true,
          },
        },
      },
    });

    let sUserSearch = await prisma.sUser.findMany({
      where: {
        serverId,
        user: {
          displayname: {
            contains: search,
          },
          username: {
            contains: search,
          },
        },
      },
      include: {
        user: true,
      },
    });

    success = true;
    return NextResponse.json(
      {
        success,
        data: {
          messages: messageSearch,
          members: sUserSearch,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
