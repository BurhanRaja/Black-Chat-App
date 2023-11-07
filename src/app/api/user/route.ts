import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import currentProfile from "@/lib/current-profile";

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
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json(
        { success, message: "User not found." },
        { status: 404 }
      );
    }

    success = true;
    return NextResponse.json({ success, data: profile }, { status: 200 });
  } catch (err) {
    console.log(err);
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
    const { username, bio, email, imageUrl } = await req.json();

    const user = await currentProfile();

    if (!user) {
      return NextResponse.json(
        { success, message: "User not found." },
        { status: 404 }
      );
    }

    await prisma?.profile.update({
      data: {
        username,
        displayname: username.charAt(0).toUpperCase() + username.slice(1),
        bio,
        email,
        imageUrl,
      },
      where: {
        userId: user.userId,
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

// export async function DELETE(
//   req: NextRequest,
//   { params }: IUserParams
// ): Promise<
//   | NextResponse<{
//       success: boolean;
//       message: string;
//     }>
//   | undefined
// > {
//   let success = false;
//   try {
//     const { userId } = params;

//     let user = await prisma?.profile.findUnique({
//       where: {
//         userId,
//       },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { success, message: "User not found." },
//         { status: 404 }
//       );
//     }

//     await prisma?.profile.delete({
//       where: {
//         userId,
//       },
//     });

//     success = true;
//     return NextResponse.json(
//       { success, message: "User successfully deleted." },
//       { status: 200 }
//     );
//   } catch (err) {
//     return NextResponse.json(
//       { success, message: "Internal Server Error." },
//       { status: 500 }
//     );
//   }
// }
