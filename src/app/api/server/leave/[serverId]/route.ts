import currentProfile from "@/lib/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { serverId: string } }
): Promise<
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
        { success, message: "Profile not found" },
        { status: 404 }
      );
    }

    const { serverId } = params;

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

    let sUser = await prisma.sUser.findFirst({
      where: {
        userId: profile.userId,
        serverId: serverId as string,
      },
    });

    if (!sUser) {
      return NextResponse.json(
        { success, message: "Member not found." },
        { status: 404 }
      );
    }

    await prisma.message.deleteMany({
      where: {
        sUserId: sUser.sUserId,
      },
    });

    await prisma.message.deleteMany({
      where: {
        replyuserId: sUser.sUserId,
      },
    });

    await prisma.sUser.delete({
      where: {
        id: sUser?.id,
        sUserId: sUser?.sUserId,
      },
    });

    success = true;
    return NextResponse.json(
      { success, message: "You Left the Server." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
