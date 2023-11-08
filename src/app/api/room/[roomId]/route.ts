import { Room } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

interface RoomGetParams {
  params: {
    roomId: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: RoomGetParams
): Promise<
  | NextResponse<{
      success: boolean;
      message?: string;
      data?: Room;
    }>
  | undefined
> {
  let success = false;

  try {
    const { roomId } = params;

    let room = await prisma.room.findUnique({
      where: {
        roomId,
      },
    });

    if (!room) {
      return NextResponse.json(
        { success, message: "Room not found." },
        { status: 404 }
      );
    }

    success = true;
    return NextResponse.json(
      {
        success,
        data: room,
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
