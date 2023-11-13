import { SUser } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

interface SearchRequestParams {
  params: {
    serverId: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: SearchRequestParams
): Promise<
  | NextResponse<{
      success: boolean;
      message?: string;
      data?: Array<SUser>;
    }>
  | undefined
> {
  let success = false;

  try {
    const { searchParams } = new URL(req.url);
    const searchText = searchParams.get("search") as string;

    const { serverId } = params;

    let server = await prisma.server.findUnique({
      where: {
        serverId,
      },
    });

    if (!server) {
      return NextResponse.json(
        { success, message: "Server not found" },
        { status: 404 }
      );
    }

    let members = [];

    if (!searchParams) {
      members = await prisma.sUser.findMany({
        where: {
          serverId,
        },
      });
    } else {
      members = await prisma.sUser.findMany({
        where: {
          serverId,
          OR: [
            {
              user: {
                displayname: {
                  startsWith: searchText,
                },
              },
            },
            {
              user: {
                displayname: {
                  endsWith: searchText,
                },
              },
            },
          ],
        },
        include: { user: true },
      });
    }

    success = true;
    return NextResponse.json({ success, data: members }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
