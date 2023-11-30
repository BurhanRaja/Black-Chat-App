import DMPannel from "./dm/dm-pannel";
import Header from "@/components/defaults/header";
import { prisma } from "@/db/client";
import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import ChatMessages from "./chat/chat-messages";
import ChatAreaLayout from "./chat/chat-area-layout";
import ChatInput from "./chat/chat-input";
import ReplyMessageProvider from "./provider/reply-message-provider";

interface AppDMLayoutProps {
  conversationId: string;
}

const AppDMLayout = async ({ conversationId }: AppDMLayoutProps) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/auth/signin");
  }

  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
    },
    include: {
      profileOne: true,
      profileTwo: true,
    },
  });

  if (!conversation) {
    redirect("/me");
  }

  let member =
    profile?.userId === conversation.profileOne.userId
      ? conversation.profileOne
      : conversation.profileTwo;

  let otherMember =
    profile?.userId !== conversation.profileOne.userId
      ? conversation.profileOne
      : conversation.profileTwo;

  let allConversations = await prisma.conversation.findMany({
    where: {
      OR: [
        {
          profileOneId: profile.userId,
        },
        {
          profileTwoId: profile.userId,
        },
      ],
    },
    include: {
      profileOne: true,
      profileTwo: true,
    },
  });

  return (
    <>
      <DMPannel
        conversations={allConversations}
        conversationId={conversationId}
        curruser={profile}
      />
      <div className="w-[79%] h-full">
        <Header conversationUser={otherMember} />
        <div className="flex">
          <ReplyMessageProvider>
            <ChatAreaLayout>
              <ChatMessages
                memberConversation={member!}
                apiUrl="/api/direct-messages"
                conversationId={conversationId}
                paramKey="conversationId"
                paramValue={conversationId}
                welcomeName={otherMember.displayname}
                welcomeType="conversation"
              />
              <div className="bg-zinc-700 relative w-[100%] pb-6 pt-2">
                <ChatInput conversationId={conversationId} canMessage />
              </div>
            </ChatAreaLayout>
          </ReplyMessageProvider>
        </div>
      </div>
    </>
  );
};

export default AppDMLayout;
