import Header from "@/components/defaults/header";
import DMPannel from "@/components/dm/dm-pannel";
import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { prisma } from "@/db/client";
import Avatar from "@/components/ui/avatar";
import { FaCircle } from "react-icons/fa";
import { BiSolidMessage } from "react-icons/bi";
import { Search, X } from "lucide-react";
import Tooltip from "@/components/ui/tooltip";
import Link from "next/link";

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

  let otherMembers = allConversations.map((el) =>
    el.profileOneId === profile.userId
      ? { conversationId: el.id, ...el.profileTwo }
      : { conversationId: el.id, ...el.profileOne }
  );

  let onlineMembers = otherMembers.filter((el) => el.connected === true);

  return (
    <>
      <DMPannel
        conversations={allConversations}
        conversationId={""}
        curruser={profile}
      />
      <div className="w-[79%] h-full">
        <Header />
        <div className="flex">
          <div className={`flex p-10 h-[93.3vh] bg-zinc-700 w-full`}>
            <div className="w-full">
              <div className="flex justify-start items-center relative px-1 mb-5">
                <Search className="absolute left-3 text-zinc-500" size={20} />
                <input
                  className="p-3 pl-10 w-[100%] rounded-md bg-[rgb(43,43,47)] outline-none text-zinc-500 channel-search text-sm"
                  placeholder="Search"
                />
              </div>
              {onlineMembers?.map((member) => {
                return (
                  <>
                    <div
                      key={member?.conversationId}
                      className="flex justify-between px-5 group items-center hover:bg-zinc-800 p-2 rounded-md my-2"
                    >
                      <div className="flex items-center">
                        <Avatar
                          image={member?.imageUrl}
                          height="h-[50px]"
                          width="w-[50px]"
                          radius="full"
                        />
                        <p className="ml-3 text-lg flex flex-col">
                          <span>{member?.displayname}</span>
                          <span className="text-xs flex items-center">
                            <span>
                              <FaCircle className="text-green-500 mr-1" />
                            </span>
                            Online
                          </span>
                        </p>
                      </div>
                      <div className="flex">
                        <Tooltip
                          trigger={
                            <Link
                              href={`/me/conversation/${member.conversationId}`}
                            >
                              <button className="hidden group-hover:block">
                                <BiSolidMessage className="text-zinc-400 hover:text-white text-xl" />
                              </button>
                            </Link>
                          }
                          side="top"
                          content="Message"
                        />
                        {/* <Tooltip
                          trigger={
                            <button className="hidden group-hover:block ml-3">
                              <X
                                size={20}
                                className="text-zinc-400 hover:text-red-500"
                              />
                            </button>
                          }
                          side="top"
                          content="Remove Conversation"
                        /> */}
                      </div>
                    </div>
                    <hr className="border-gray-400 border-1" />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationOnlineMember;
