import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

export async function GET(): Promise<
  | NextResponse<{
      success: boolean;
      data?: any;
    }>
  | undefined
> {
  let success = false;
  try {
    let users = await prisma.profile.findMany();
    success = true;
    return NextResponse.json({ success, data: users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
