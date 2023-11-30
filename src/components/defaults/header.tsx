"use client";

import { Hash, Users2 } from "lucide-react";
import MemberSearch from "../members/member-search";
import Tooltip from "../ui/tooltip";
import { useParams, usePathname } from "next/navigation";
import { MdEmojiPeople } from "react-icons/md";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Profile, Room } from "@prisma/client";
import { MemberPannelContext } from "@/context/createContext";
import Avatar from "../ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface HeaderProps {
  conversationUser?: Profile;
}

const Header = ({ conversationUser }: HeaderProps) => {
  const [roomDetails, setRoomDetails] = useState<Room>();

  const params = useParams();
  const pathname = usePathname();
  const { memberPannelOpen, setMemberPannelOpen } =
    useContext(MemberPannelContext);
  const { data: session } = useSession();

  const handleRoomDetails = async () => {
    if (params?.roomId) {
      let response = await axios.get(`/api/room/${params?.roomId}`);
      if (response.data.success) {
        setRoomDetails(response.data.data);
      }
    }
  };

  useEffect(() => {
    handleRoomDetails();
  }, []);

  return (
    <>
      <div className="bg-[rgb(71,71,79)] p-3 pb-2 shadow-md flex justify-between pr-5">
        {pathname === "/me" || pathname === "/me/conversation/online" ? (
          <>
            <div className="flex items-center">
              <p className="mr-2 flex items-center">
                <span>
                  <MdEmojiPeople className="mr-1 text-xl text-zinc-400" />
                </span>
                <span>Friends</span>
              </p>
              <p className="mr-2 text-zinc-400">|</p>
              <Link href={"/me/conversation/online"}>
                <button
                  className={`p-1 px-2 text-sm mr-2 ${
                    pathname === "/me/conversation/online"
                      ? "bg-zinc-800"
                      : "hover:bg-zinc-800"
                  } rounded-md`}
                >
                  Online
                </button>
              </Link>
              <button className="p-1 px-2 text-sm hover:bg-zinc-800 rounded-md">
                All
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center">
              {conversationUser ? (
                <div className="mr-1.5">
                  <Avatar
                    image={conversationUser.imageUrl!}
                    altname={conversationUser.username}
                    width="w-[26px]"
                    height="h-[26px]"
                  />
                </div>
              ) : (
                <Hash size={18} className="mr-1" />
              )}
              <p className={conversationUser ? "text-sm" : ""}>
                {conversationUser
                  ? conversationUser.displayname
                  : roomDetails?.name}
              </p>
            </div>
            <div className="flex items-center">
              <MemberSearch />
              {!conversationUser && (
                <Tooltip
                  trigger={
                    <Users2
                      className="cursor-pointer"
                      onClick={() => setMemberPannelOpen(!memberPannelOpen)}
                    />
                  }
                  content="User's List"
                  side="bottom"
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
