import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

export async function POST(
  req: NextRequest,
  { params }: { params: { serverId: string } }
): Promise<
  | NextResponse<{
      success: boolean;
      message?: string;
    }>
  | undefined
> {
  let success = false;
  try {
    const { sUserId, type } = await req.json();
    const { serverId } = params;

    let sUser = await prisma.sUser.findFirst({
      where: {
        sUserId,
        serverId,
      },
    });

    if (!sUser) {
      return NextResponse.json(
        {
          success,
          message: "Server Member not found.",
        },
        { status: 404 }
      );
    }

    await prisma.sUser.update({
      data: {
        type,
      },
      where: {
        sUserId,
        serverId,
      },
    });

    success = true;
    return NextResponse.json(
      { success, message: `Role successfully changed to ${type}` },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
