import currentProfile from "@/lib/current-profile";
import { prisma } from "@/db/client";
import { redirect } from "next/navigation";

const ServerRedirect = async ({ params }: { params: { serverId: string } }) => {
  const profile = await currentProfile();

  let server: any = {};

  if (!profile) {
    server = {};
    return redirect(`/me`);
  } else {
    server = await prisma.server.findFirst({
      where: {
        serverId: params.serverId,
        sUsers: {
          some: { userId: profile?.userId },
        },
        rooms: {
          some: { default: true },
        },
      },
      include: {
        rooms: true,
      },
    });

    console.log(server);

    return redirect(`/servers/${server?.serverId}/${server?.rooms[0].roomId}`);
  }
};

export default ServerRedirect;
