import { ChatAreaImageItem } from "@/components/chat/chat-messages";
import DMPannel from "@/components/dm/dm-pannel";
import Header from "@/components/defaults/header";
import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { prisma } from "@/db/client";

const Home = async () => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/auth/signin");
  }

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
        curruser={profile}
        conversationId={""}
      />
      <div className="w-[79%] h-full">
        <Header />
        <div className="flex">
          <ChatAreaImageItem />
        </div>
      </div>
    </>
  );
};

export default Home;
