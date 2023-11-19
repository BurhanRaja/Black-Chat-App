"use client";

import { useSession } from "next-auth/react";
import Avatar from "../ui/avatar";
import Dropdown from "../ui/dropdown";
import { Send } from "lucide-react";
import { FaCircle } from "react-icons/fa";

interface MemberItemProps {
  image: string;
  name: string;
  userId: string;
  isOnline: boolean;
}

const MemberItem = ({ image, name, userId, isOnline }: MemberItemProps) => {
  const { data: session } = useSession();
  console.log(isOnline);
  return (
    <>
      {session?.user.userId !== userId ? (
        <Dropdown
          trigger={
            <button className="flex items-center p-2 hover:bg-zinc-800 rounded-md cursor-pointer w-[100%]">
              <Avatar
                image={image}
                altname={name}
                width="w-[40px]"
                height="h-[40px]"
              />
              <p className="ml-2">
                <span>
                  {name.length <= 11 ? name : name.substring(0, 11) + "..."}
                </span>
                <span className="text-xs flex items-center">
                  <span>
                    {isOnline ? (
                      <FaCircle className={`text-xs mr-1 text-green-500`} />
                    ) : (
                      <FaCircle className={`text-xs mr-1 text-red-500`} />
                    )}
                  </span>
                  <span>{isOnline ? "Online" : "Offline"}</span>
                </span>
              </p>
            </button>
          }
          items={[
            {
              content: "Message",
              link: `/direct-message/${userId}`,
              textColor: "text-white",
              handleFunction: () => {},
              icon: <Send size={16} />,
            },
          ]}
          contentColor="bg-gray-900"
          contentWidth="w-[200px]"
          side="left"
        />
      ) : (
        <button className="flex items-center p-2 hover:bg-zinc-800 rounded-md cursor-pointer w-[100%]">
          <Avatar
            image={image}
            altname={name}
            width="w-[40px]"
            height="h-[40px]"
          />
          <p className="ml-2">
            <span>
              {name.length <= 11 ? name : name.substring(0, 11) + "..."}
            </span>
            <span className="text-xs flex items-center">
              <span>
                <FaCircle className={`text-xs mr-1 text-green-500`} />
              </span>
              <span>Online</span>
            </span>
          </p>
        </button>
      )}
    </>
  );
};

export default MemberItem;
