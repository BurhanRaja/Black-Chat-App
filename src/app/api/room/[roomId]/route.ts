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

export async function PUT(
  req: NextRequest,
  { params }: RoomGetParams
): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;

  try {
    const { roomId } = params;

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const {
      name,
      isPrivate,
      updatePermission,
      deletePermission,
      messagePermission,
      privatePermission,
    } = await req.json();

    let room = await prisma.room.findUnique({
      where: {
        roomId,
        serverId: serverId as string,
      },
    });

    if (!room) {
      return NextResponse.json(
        { success, message: "Room not found." },
        { status: 404 }
      );
    }

    room = await prisma.room.update({
      data: {
        name,
        isPrivate,
        updatePermission,
        deletePermission,
        messagePermission,
        privatePermission,
      },
      where: {
        roomId,
        serverId: serverId as string,
      },
    });

    success = true;
    return NextResponse.json(
      { success, message: "Room updated successfully." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RoomGetParams
): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;

  try {
    const { roomId } = params;
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    let room = await prisma.room.findUnique({
      where: {
        roomId,
        serverId: serverId as string,
      },
    });

    if (!room) {
      return NextResponse.json(
        { success, message: "Room not found." },
        { status: 404 }
      );
    }

    await prisma.room.delete({
      where: {
        roomId,
        serverId: serverId as string,
      },
    });

    success = true;
    return NextResponse.json(
      { success, message: "Room deleted successfully." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
