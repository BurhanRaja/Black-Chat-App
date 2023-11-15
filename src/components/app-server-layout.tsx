import MemberPanel from "@/components/members/member-panel";
import RoomPanel from "./room/room-panel";
import { prisma } from "@/db/client";
import MemberPannelProvider from "./provider/member-pannel-provider";
import Header from "@/components/defaults/header";
import ChatMessages from "@/components/chat/chat-messages";
import ChatAreaLayout from "./chat/chat-area-layout";
import ChatInput from "./chat/chat-input";

interface AppServerLayoutProps {
  serverId: string;
  roomId: string;
}

const AppServerLayout = async ({ serverId, roomId }: AppServerLayoutProps) => {
  const queryKey = `chat:${roomId}`;
  const addKey = `chat:${roomId}:message`;
  const updateKey = `chat:${roomId}:message:update`;

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
        <div className="w-[79%] h-full">
          <Header />
          <div className="flex">
            <ChatAreaLayout>
              <ChatMessages
                queryKey={queryKey}
                apiUrl="/api/messages"
                paramKey="roomId"
                paramValue={roomId}
              />
              <div className="bg-zinc-700 relative w-[100%] pb-6 pt-2">
                <ChatInput serverId={serverId} roomId={roomId} />
              </div>
            </ChatAreaLayout>
            <MemberPanel members={serverUsers} />
          </div>
        </div>
      </MemberPannelProvider>
    </>
  );
};

export default AppServerLayout;
