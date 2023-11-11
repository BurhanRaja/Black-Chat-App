import { prisma } from "@/db/client";
import currentProfile from "@/lib/current-profile";
import { SUserRole } from "@prisma/client";
import { randomBytes } from "crypto";
import { redirect } from "next/navigation";

interface InviteCodeProps {
  params: {
    inviteCode: string;
  };
}

const InviteCode = async ({ params }: InviteCodeProps) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/auth/signin");
  }

  if (!params.inviteCode) {
    return redirect("/me");
  }

  const existingServer = await prisma.server.findUnique({
    where: {
      inviteCode: params.inviteCode,
      sUsers: {
        some: {
          userId: profile.userId,
        },
      },
    },
    include: {
      rooms: true,
    },
  });

  if (existingServer) {
    let defaultRoom = existingServer.rooms.filter(
      (room) => room.default === true
    );
    redirect(`/servers/${existingServer.serverId}/${defaultRoom[0].roomId}`);
  }

  const server = await prisma.server.findUnique({
    where: {
      inviteCode: params.inviteCode,
    },
    include: {
      rooms: true,
    },
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
    type: SUserRole["MEMBER"],
    serverId: server?.serverId!,
    userId: profile?.userId!,
  };

  await prisma.sUser.create({
    data: sUserData,
  });

  let defaultRoom = server?.rooms.filter((room) => room.default === true)!;
  return redirect(`/servers/${server?.serverId}/${defaultRoom[0].roomId}`);
};

export default InviteCode;
