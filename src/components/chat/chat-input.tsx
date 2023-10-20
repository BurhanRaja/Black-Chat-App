"use client";
import { PlusCircle, SmilePlus } from "lucide-react";
import { BsFillEmojiLaughingFill } from "react-icons/bs";

const ChatInput = () => {
  return (
    <>
      <div className="flex items-center justify-center bg-zinc-800 w-[90%] mx-auto rounded-sm px-2 p-1">
        <PlusCircle className="text-zinc-500 hover:text-zinc-300 cursor-pointer" size={25} />
        <input
          type="text"
          className="w-[90%] p-2.5 mx-2 outline-none bg-zinc-800 chat-input"
          placeholder="Write a Message"
        />
        <BsFillEmojiLaughingFill className="text-zinc-500 hover:text-yellow-500 rounded-3xl text-2xl cursor-pointer" />
      </div>
    </>
  );
};

export default ChatInput;
