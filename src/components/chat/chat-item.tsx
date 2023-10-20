"use client";

import Avatar from "../ui/avatar";
import Dropdown from "../ui/dropdown";
import { BsFillReplyFill, BsFillEmojiLaughingFill } from "react-icons/bs";
import { SmilePlus } from "lucide-react";
import Tooltip from "../ui/tooltip";

const ChatItem = () => {
  return (
    <>
      <div className="relative flex items-start hover:bg-[rgb(54,54,58)] p-2 py-3 group">
        <div className="absolute right-10 top-[-6px] bg-zinc-800 px-2 py-0.5 hidden group-hover:block">
          <Tooltip
            trigger={
              <button className="mr-1 p-1">
                <BsFillReplyFill className="text-xl" />
              </button>
            }
            side="top"
            content="Reply"
          />
          <Tooltip
            trigger={
              <button className="p-1">
                <SmilePlus size={19} />
              </button>
            }
            side="top"
            content="Add Reaction"
          />
        </div>
        <Dropdown
          trigger={
            <Avatar
              image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              altname="anyname"
            />
          }
          items={[
            {
              content: "Direct Message",
              link: "",
              textColor: "white",
              hoverBackgroundColor: "bg-zinc-800",
            },
          ]}
          contentWidth="w-[300px]"
          contentColor="bg-gray-900"
        />
        <div className="ml-2">
          <p className="text-sm text-zinc-400">
            <span className="text-green-400">BurhanRaja </span> -{" "}
            <span className="text-xs ">2023/04/05</span>
          </p>
          <p>Content written here. More is on the way</p>
          <button className="flex items-center justify-between bg-zinc-800 p-0.5 px-1 text-xs mt-1 rounded-md">
            <BsFillEmojiLaughingFill className="text-xs text-yellow-500 mr-1" />
            <p>1</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatItem;
