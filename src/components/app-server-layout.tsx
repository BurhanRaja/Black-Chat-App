import ChatArea from "@/components/chat/chat-area";
import MemberPanel from "@/components/members/member-panel";
import MainCommonLayout from "./defaults/main-common-layout";
import RoomPanel from "./room/room-panel";
import { prisma } from "@/db/client";
import MemberPannelProvider from "./provider/user-type-provider";
import Header from "@/components/defaults/header";

interface AppServerLayoutProps {
  serverId: string;
  roomId: string;
}

const AppServerLayout = async ({ serverId, roomId }: AppServerLayoutProps) => {
  const serverUsers = await prisma.sUser.findMany({
    where: {
      serverId,
    },
    include: {
      user: true,
    },
  });

  const server = await prisma.server.findUnique({
    where: {
      serverId,
    },
    include: {
      sUsers: {
        include: {
          user: true,
        },
      },
      rooms: true,
    },
  });

  return (
    <>
      <MemberPannelProvider>
        <RoomPanel
          server={server!}
          rooms={server?.rooms!}
          members={server?.sUsers!}
        />
        <div className="content w-[79%]">
          <Header />
          <div className="flex">
            <ChatArea />
            <MemberPanel members={serverUsers} />
          </div>
        </div>
      </MemberPannelProvider>
    </>
  );
};

export default AppServerLayout;
