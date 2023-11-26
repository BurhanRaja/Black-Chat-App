import MemberPanel from "@/components/members/member-panel";
import RoomPanel from "./room/room-panel";
import { prisma } from "@/db/client";
import MemberPannelProvider from "./provider/member-pannel-provider";
import Header from "@/components/defaults/header";
import ChatMessages from "@/components/chat/chat-messages";
import ChatAreaLayout from "./chat/chat-area-layout";
import ChatInput from "./chat/chat-input";
import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import ReplyMessageProvider from "./provider/reply-message-provider";
import MediaRoom from "./room/media-room";

interface AppServerLayoutProps {
  serverId: string;
  roomId: string;
}

const AppServerLayout = async ({ serverId, roomId }: AppServerLayoutProps) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/auth/signin");
  }

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

  const member = server?.sUsers.find(
    (member) => member.userId === profile?.userId
  );

  const currRoom = server?.rooms.find((room) => room.roomId === roomId);

  const canMessage = currRoom?.messagePermission.includes(member?.type!);

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
          <div className="flex h-[92%]">
            <ReplyMessageProvider>
              {currRoom?.type === "TEXT" && (
                <>
                  <ChatAreaLayout>
                    <ChatMessages
                      conversationId=""
                      memberServer={member!}
                      chatId={roomId}
                      serverId={serverId}
                      apiUrl="/api/messages"
                      paramKey="roomId"
                      paramValue={roomId}
                      welcomeName={currRoom?.name!}
                      welcomeType="room"
                    />
                    <div className="bg-zinc-700 relative w-[100%] pb-6 pt-2">
                      <ChatInput
                        serverId={serverId}
                        chatId={roomId}
                        canMessage={canMessage!}
                      />
                    </div>
                  </ChatAreaLayout>
                  <MemberPanel members={serverUsers} />
                </>
              )}
              {currRoom?.type === "VIDEO" && (
                <ChatAreaLayout>
                  <MediaRoom audio video roomId={roomId} />
                </ChatAreaLayout>
              )}
              {currRoom?.type === "AUDIO" && (
                <ChatAreaLayout>
                  <MediaRoom audio video={false} roomId={roomId} />
                </ChatAreaLayout>
              )}
            </ReplyMessageProvider>
          </div>
        </div>
      </MemberPannelProvider>
    </>
  );
};

export default AppServerLayout;
