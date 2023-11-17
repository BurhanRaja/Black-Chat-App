"use client";

import Avatar from "../ui/avatar";
import { BsFillReplyFill, BsFillEmojiLaughingFill } from "react-icons/bs";
import { Ban, Edit2, File, SmilePlus, Trash2, X } from "lucide-react";
import Tooltip from "../ui/tooltip";
import { Profile, SUser, SUserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { AlertContext, ModalContext } from "@/context/createContext";

interface ChatItemProps {
  color: string;
  serverId: string;
  chatId: string;
  messageId: string;
  currmember: {
    user: Profile;
  } & SUser;
  message: string;
  file: string;
  fileType: string | undefined;
  username: string;
  createdAt: string;
  userImage: string;
  deleted: boolean;
  messageUserId: string;
}

const ChatItem = ({
  message,
  file,
  fileType,
  username,
  createdAt,
  userImage,
  color,
  deleted,
  messageUserId,
  serverId,
  chatId,
  messageId,
  currmember,
}: ChatItemProps) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editMsgRef = useRef<HTMLTextAreaElement>(null);

  const { onOpen } = useContext(ModalContext);

  const isAdmin = currmember.type === "ADMIN";
  const isModerator = currmember.type === "MODERATOR";
  const isOwner = currmember.userId === messageUserId;
  const canDelete = !deleted && (isAdmin || isModerator || isOwner);
  const canEdit = !deleted && isOwner && !file;

  const handleEditMessage = async () => {
    if (!editMsgRef.current?.value) {
      return;
    }
    let data = {
      content: editMsgRef.current.value,
    };
    const response = await axios.put(
      `/api/socket/messages/${messageId}?serverId=${serverId}&roomId=${chatId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      setIsEditing(false);
      editMsgRef.current.value = "";
    }
  };

  return (
    <>
      <div className="relative flex items-start hover:bg-[rgb(54,54,58)] p-2 py-3 group">
        {!deleted && !isEditing ? (
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
                  <SmilePlus size={20} className="text-yellow-400" />
                </button>
              }
              side="top"
              content="Add Reaction"
            />
            {canEdit && (
              <Tooltip
                trigger={
                  <button
                    className="p-1.5 rounded-sm hover:bg-zinc-700"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 size={20} />
                  </button>
                }
                side="top"
                content="Edit"
              />
            )}

            {canDelete && (
              <Tooltip
                trigger={
                  <button
                    className="p-1.5 rounded-sm hover:bg-zinc-700"
                    onClick={() =>
                      onOpen("deleteMessage", {
                        query: `/${messageId}?serverId=${serverId}&roomId=${chatId}`,
                      })
                    }
                  >
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                }
                side="top"
                content="Delete"
              />
            )}
          </div>
        ) : (
          <div className="absolute right-10 top-[-6px] bg-zinc-800 px-2 py-0.5 hidden group-hover:block">
            <Tooltip
              trigger={
                <button className="p-1.5 rounded-sm hover:bg-zinc-700">
                  <X size={20} className="text-red-500" />
                </button>
              }
              side="top"
              content="Remove Deleted Message"
            />
          </div>
        )}
        {!deleted ? (
          <Avatar image={userImage} altname="anyname" />
        ) : (
          <Avatar
            fallback={<Ban size={40} />}
            fallbackColor="text-gray-400"
            fallbackBackgroundColor="bg-zinc-700"
          />
        )}

        <div className={`ml-2 ${isEditing ? "w-[75%]" : ""}`}>
          <p className="text-sm">
            <>
              <span style={{ color: color }}>{username} </span> -{" "}
              <span className="text-xs text-zinc-400">{createdAt}</span>
            </>
          </p>
          {isEditing && (
            <div className="my-1 flex">
              <textarea
                ref={editMsgRef}
                className="w-[100%] p-2.5 mx-2 outline-none bg-zinc-800 chat-input rounded-sm"
                placeholder="Write a Message"
                defaultValue={message}
              />
              <div className="text-right">
                <button
                  className="p-2.5 rounded-sm bg-black"
                  onClick={handleEditMessage}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {!deleted ? (
            <>
              {fileType && fileType !== "pdf" && (
                <div className="bg-zinc-800 rounded-md max-h-[300px] max-width-[400px] h-auto p-2 cursor-pointer my-1">
                  <img src={file} className="max-h-[250px] max-width-[350px]" />
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
              <p>{!isEditing ? message : ""}</p>
            </>
          ) : (
            <p className="text-gray-400">{message}</p>
          )}
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
