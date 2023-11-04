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
    const user = await currentProfile();

    if (!user) {
      return NextResponse.json(
        { success, message: "User not found." },
        { status: 404 }
      );
    }

    let profile = {
      username: user.username,
      displayname: user.displayname,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.imageUrl,
      bio: user.bio,
      gender: user.gender,
    };

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
    const { username, displayname, email, gender, imageUrl } = await req.json();

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
        displayname,
        email,
        gender,
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
