import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import hashPassword from "@/lib/hash-password";

interface ForgetPasswordTokenParams {
  params: {
    token: string;
  };
}

export async function POST(
  req: NextRequest,
  { params }: ForgetPasswordTokenParams
): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;

  try {
    const { token } = params;
    const { password } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success, message: "Token not found." },
        { status: 404 }
      );
    }

    let profile = await prisma.profile.findFirst({
      where: {
        forgetPasswordToken: token,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { success, message: "Invalid Token." },
        { status: 400 }
      );
    }

    let securePassword = await hashPassword(password);

    await prisma.profile.update({
      data: {
        password: securePassword,
        forgetPasswordToken: "",
      },
      where: {
        userId: profile.userId,
      },
    });

    return NextResponse.json(
      { success, message: "Password Reset Successful." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success, message: "Interval Server Error." },
      { status: 500 }
    );
  }
}
