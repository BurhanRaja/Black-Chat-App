"use client";

import { Hash, Users2 } from "lucide-react";
import MemberSearch from "../members/member-search";
import Tooltip from "../ui/tooltip";
import { useParams } from "next/navigation";
import { MdEmojiPeople } from "react-icons/md";

const Header = () => {
  const params = useParams();

  return (
    <>
      <div className="bg-[rgb(71,71,79)] p-3 pb-2 shadow-md flex justify-between pr-5">
        {params?.serverId === "%40me" ? (
          <>
            <div className="flex items-center">
              <p className="mr-2 flex items-center">
                <span>
                  <MdEmojiPeople className="mr-1 text-xl text-zinc-400" />
                </span>
                <span>Friends</span>
              </p>
              <p className="mr-2 text-zinc-400">|</p>
              <button className="p-1 px-2 text-sm mr-2 hover:bg-zinc-800 rounded-md">
                Online
              </button>
              <button className="p-1 px-2 text-sm hover:bg-zinc-800 rounded-md">
                All
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <Hash size={18} className="mr-1" />
              <p>announcement</p>
            </div>
            <div className="flex items-center">
              <MemberSearch />
              <Tooltip
                trigger={<Users2 className="cursor-pointer" />}
                content="User's List"
                side="bottom"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
