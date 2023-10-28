import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

interface IUserParams {
  params: {
    userId: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: IUserParams
): Promise<
  | NextResponse<{
      success: boolean;
      data?: Object;
      message?: string;
    }>
  | undefined
> {
  let success = false;

  try {
    success = true;

    const { userId } = params;

    let user = (await prisma?.profile.findUnique({
      where: {
        userId,
      },
      select: {
        username: true,
        displayname: true,
        userId: true,
        email: true,
        emailVerified: true,
        gender: true,
        imageUrl: true,
      },
    })) as Object;

    if (!user) {
      return NextResponse.json(
        { success, message: "User not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success, data: user }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: IUserParams
): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;

  try {
    const { username, displayname, email, gender, imageUrl } = await req.json();

    const { userId } = params;

    let user = await prisma?.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success, message: "User not found." },
        { status: 404 }
      );
    }

    await prisma?.profile.update({
      data: {
        username,
        displayname,
        email,
        gender,
        imageUrl,
      },
      where: {
        userId,
      },
    });

    success = true;
    return NextResponse.json(
      { success, message: "User successfully updated." },
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
  { params }: IUserParams
): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;
  try {
    const { userId } = params;

    let user = await prisma?.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success, message: "User not found." },
        { status: 404 }
      );
    }

    await prisma?.profile.delete({
      where: {
        userId,
      },
    });

    success = true;
    return NextResponse.json(
      { success, message: "User successfully deleted." },
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
