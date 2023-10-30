import { decryptData } from "@/lib/encrypt-decrypt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

interface IVerifyUserParams {
  params: {
    token: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: IVerifyUserParams
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

    const decodedToken = decryptData(token).split("-");

    let profile = prisma.profile.findUnique({
      where: {
        userId: decodedToken[0],
      },
    });

    if (!profile) {
      return NextResponse.json(
        { success, message: "Invalid Token" },
        { status: 400 }
      );
    }

    await prisma.profile.update({
      data: {
        emailVerified: true,
      },
      where: {
        userId: decodedToken[0],
      },
    });

    success = true;
    return NextResponse.json(
      { success, message: "Successfully Verified" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
