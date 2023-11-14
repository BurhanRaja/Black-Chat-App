"use client";

import Avatar from "../ui/avatar";
import { BsFillReplyFill, BsFillEmojiLaughingFill } from "react-icons/bs";
import { File, SmilePlus } from "lucide-react";
import Tooltip from "../ui/tooltip";
import { SUserRole } from "@prisma/client";

interface ChatItemProps {
  message: string;
  file: string;
  fileType: string | undefined;
  username: string;
  createdAt: string;
  userImage: string;
  type: SUserRole;
}

const ChatItem = ({
  message,
  file,
  fileType,
  username,
  createdAt,
  userImage,
  type,
}: ChatItemProps) => {
  console.log(file);
  return (
    <>
      <div className="relative flex items-start hover:bg-[rgb(54,54,58)] p-2 py-3 group">
        <div className="absolute right-10 top-[-6px] bg-zinc-800 px-2 py-0.5 hidden group-hover:block">
          <Tooltip
            trigger={
              <button className="mr-1 p-1 rounded-sm hover:bg-zinc-700">
                <BsFillReplyFill className="text-xl" />
              </button>
            }
            side="top"
            content="Reply"
          />
          <Tooltip
            trigger={
              <button className="p-1.5 rounded-sm hover:bg-zinc-700">
                <SmilePlus size={20} />
              </button>
            }
            side="top"
            content="Add Reaction"
          />
        </div>
        <Avatar image={userImage} altname="anyname" />
        <div className="ml-2">
          <p className="text-sm text-zinc-400">
            <span className="text-green-400">{username} </span> -{" "}
            <span className="text-xs ">{createdAt}</span>
          </p>
          {fileType && fileType !== "pdf" && (
            <div className="bg-zinc-800 rounded-md max-h-[300px] max-width-[400px] h-auto p-2 cursor-pointer my-1">
              <img
                src={file}
                className="max-h-[250px] max-width-[350px]"
              />
            </div>
          )}
          {fileType === "pdf" && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-neutral-800 my-1">
              <File
                size={35}
                className="h-10 w-10 fill-indigo-200 stroke-indigo-400"
              />
              <a className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline cursor-pointer">
                PDF File
              </a>
            </div>
          )}
          <p>{message}</p>
          {/* <button className="flex items-center justify-between bg-zinc-800 p-0.5 px-1 text-xs mt-1 rounded-md">
            <BsFillEmojiLaughingFill className="text-xs text-yellow-500 mr-1" />
            <p>1</p>
          </button> */}
        </div>
      </div>
    </>
  );
};

export default ChatItem;
