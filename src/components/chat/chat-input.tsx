"use client";
import { PlusCircle } from "lucide-react";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";
import Dropdown from "../ui/dropdown";

const FileUpload = () => {
  return (
    <>
      <Dropdown
        trigger={
          <PlusCircle
            className="text-zinc-500 hover:text-zinc-300 cursor-pointer"
            size={25}
          />
        }
        items={[
          {
            content: "Upload File",
            link: "",
            icon: <FaUpload className="text-lg" />,
            textColor: "text-white hover:text-gray-800",
            hoverBackgroundColor: "hover:bg-white",
          },
        ]}
        contentWidth="w-[150px] mb-3"
        contentColor="bg-gray-900"
        side="top"
        align="start"
        alignOffset={-19}
      />
    </>
  );
};

const ChatInput = () => {
  return (
    <>
      <div className="relative flex items-center justify-center bg-zinc-800 w-[90%] mx-auto rounded-sm px-2 p-1">
        {/* <div className="absolute flex items-center justify-between left-0 top-[-30px] w-[100%] p-1.5 px-2 rounded-t-md text-sm bg-black">
          <p>Replying to <span className="text-orange-500">Rahul</span></p>
          <button><XCircle size={18} className="text-zinc-400 hover:text-zinc-200" /></button>
        </div> */}
        <FileUpload />
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
