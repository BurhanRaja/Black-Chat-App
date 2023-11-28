import Header from "@/components/defaults/header";
import DMPannel from "@/components/dm/dm-pannel";
import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { prisma } from "@/db/client";
import Avatar from "@/components/ui/avatar";
import { FaCircle } from "react-icons/fa";
import { BiSolidMessage } from "react-icons/bi";

const ConversationOnlineMember = async () => {
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

  let onlineMembers = allConversations.map((el) =>
    el.profileOneId === profile.userId ? el.profileTwo : el.profileOne
  );

  return (
    <>
      <DMPannel conversations={allConversations} curruser={profile} />
      <div className="w-[79%] h-full">
        <Header />
        <div className="flex">
          <div className={`flex p-10 h-[93.3vh] bg-zinc-700 w-full`}>
            <div className="w-full">
              <div className="flex justify-between px-5 group items-center hover:bg-zinc-800 p-2 rounded-md my-2">
                <div className="flex items-center">
                  <Avatar
                    image="https://images.unsplash.com/photo-1701083266430-c9b2a5ab1353?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height="h-[50px]"
                    width="w-[50px]"
                    radius="full"
                  />
                  <p className="ml-3 text-lg flex flex-col">
                    <span>Hello</span>
                    <span className="text-xs flex items-center">
                      <span>
                        <FaCircle className="text-green-500 mr-1" />
                      </span>
                      Online
                    </span>
                  </p>
                </div>
                <div className="hidden gorup-hover:show">
                  <BiSolidMessage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationOnlineMember;
