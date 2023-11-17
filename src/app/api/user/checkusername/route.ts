import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

export async function GET(req: NextRequest): Promise<
  | NextResponse<{
      success: boolean;
      usernameUsed?: boolean;
      message?: string;
    }>
  | undefined
> {
  let success = false;
  try {
    const username = req.nextUrl.searchParams.get("username") as string;

    let user = await prisma.profile.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      success = true;
      return NextResponse.json(
        { success, usernameUsed: true },
        { status: 200 }
      );
    }

    success = true;
    return NextResponse.json({ success, usernameUsed: false }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
