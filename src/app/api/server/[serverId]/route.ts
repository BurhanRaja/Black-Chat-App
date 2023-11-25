import currentProfile from "@/lib/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { SUserRole } from "@prisma/client";

interface ServerGet {
  params: {
    serverId: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: ServerGet
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
    const { serverId } = params;
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { success, message: "Profile not found" },
        { status: 404 }
      );
    }

    let server = await prisma.server.findUnique({
      where: {
        serverId,
      },
      include: {
        rooms: true,
        sUsers: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!server) {
      return NextResponse.json(
        {
          success,
          message: "Server not found.",
        },
        { status: 404 }
      );
    }

    success = true;
    return NextResponse.json({ success, data: server }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        success,
        message: "Internal Server Error.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: ServerGet
): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;

  try {
    const { serverId } = params;
    const { imageUrl, name } = await req.json();

    const user = await currentProfile();

    let server = await prisma.server.findUnique({
      where: {
        serverId,
      },
    });

    if (!server) {
      return NextResponse.json(
        { success, message: "Server not found." },
        { status: 404 }
      );
    }

    server = await prisma.server.findUnique({
      where: {
        serverId,
        sUsers: {
          some: {
            userId: user?.userId!,
            type: SUserRole["ADMIN"],
          },
        },
      },
    });

    if (!server) {
      return NextResponse.json(
        { success, message: "Only Admin can update Server." },
        { status: 403 }
      );
    }

    await prisma.server.update({
      data: {
        name,
        imageUrl,
      },
      where: {
        serverId,
      },
    });

    return NextResponse.json(
      { success, message: "Server details updated successfully." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success,
        message: "Internal Server Error.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: ServerGet
): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;

  try {
    const { serverId } = params;

    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { success, message: "Profile not found" },
        { status: 404 }
      );
    }

    let server = await prisma.server.findUnique({
      where: {
        serverId,
      },
      include: {
        sUsers: true,
      },
    });

    if (!server) {
      return NextResponse.json(
        { success, message: "Server not found." },
        { status: 404 }
      );
    }

    let member = server.sUsers.find((el) => el.userId === profile.userId);

    if (member?.type !== "ADMIN") {
      return NextResponse.json(
        { success, message: "Permission denied." },
        { status: 400 }
      );
    }

    await prisma.server.delete({
      where: {
        serverId,
      },
    });

    success = true;
    return NextResponse.json(
      { success, message: "Server deleted successfully." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success,
        message: "Internal Server Error.",
      },
      { status: 500 }
    );
  }
}
