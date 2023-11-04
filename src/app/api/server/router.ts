import currentProfile from "@/lib/current-profile";
import { encryptToken } from "@/lib/encrypt-decrypt";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { SUserRole } from "@prisma/client";

export async function POST(req: NextRequest): Promise<
  | NextResponse<{
      success: boolean;
      message: string;
    }>
  | undefined
> {
  let success = false;

  try {
    const { imageUrl, name } = await req.json();

    const user = await currentProfile();

    let server = await prisma.server.findUnique({
      where: {
        name,
      },
    });

    if (server) {
      return NextResponse.json(
        { success, message: "Choose a unique name for your Server." },
        { status: 400 }
      );
    }

    let uniqueId = randomBytes(15).toString("hex");

    server = await prisma.server.findUnique({
      where: {
        serverId: uniqueId,
      },
    });

    if (server) {
      uniqueId += randomBytes(4).toString("hex");
    }

    let inviteCode = encryptToken(name + "-" + uniqueId);

    let data = {
      name,
      imageUrl,
      serverId: uniqueId,
      inviteCode,
      ownerId: user?.userId!,
    };

    server = await prisma.server.create({
      data,
    });

    let userUniqueId = randomBytes(12).toString("hex");
    let sUser = await prisma.sUser.findUnique({
      where: {
        sUserId: userUniqueId,
      },
    });

    if (sUser) {
      userUniqueId += randomBytes(3).toString("hex");
    }

    let sUserData = {
      sUserId: userUniqueId,
      type: SUserRole["ADMIN"],
      serverId: server.id,
      userId: user?.userId!,
    };

    await prisma.sUser.create({
      data: sUserData,
    });

    // Create Room Also "General"

    success = true;
    return NextResponse.json(
      { success, message: "Server created successfully." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success, message: "Interval Server Error." },
      { status: 500 }
    );
  }
}
