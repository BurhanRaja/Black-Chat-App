import currentProfile from "@/lib/current-profile";
import { Room, RoomType, SUserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

interface GetServerRoomsParams {
  params: {
    serverId: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: GetServerRoomsParams
): Promise<
  | NextResponse<{
      success: boolean;
      message?: string;
      data?: {
        textRoom: Array<Room>;
        audioRoom: Array<Room>;
        videoRoom: Array<Room>;
      };
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

    const { serverId } = params;

    const rooms = await prisma.server.findMany({
      where: {
        serverId,
      },
    });

    if (!rooms) {
      return NextResponse.json(
        {
          success,
          message: "Rooms not found.",
        },
        { status: 404 }
      );
    }

    let textRoom = await prisma.room.findMany({
      where: {
        serverId,
        type: RoomType["TEXT"],
      },
    });

    let audioRoom = await prisma.room.findMany({
      where: {
        serverId,
        type: RoomType["AUDIO"],
      },
    });

    let videoRoom = await prisma.room.findMany({
      where: {
        serverId,
        type: RoomType["VIDEO"],
      },
    });

    success = true;
    return NextResponse.json(
      {
        success,
        data: {
          textRoom,
          audioRoom,
          videoRoom,
        },
      },
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
