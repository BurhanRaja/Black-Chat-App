import currentProfile from "@/lib/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

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
        {
          success,
          message: "UnAuthorized",
        },
        { status: 401 }
      );
    }

    const { connection } = await req.json();

    await prisma.profile.update({
      data: {
        connected: connection,
      },
      where: {
        userId: profile.userId,
      },
    });

    success = true;
    if (connection) {
      return NextResponse.json(
        { success, message: "Connected" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success, message: "DisConnected" },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
