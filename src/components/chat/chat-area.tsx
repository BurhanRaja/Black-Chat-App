"use client";
import ScrollArea from "../ui/scroll-area";
import Image from "next/image";
import ChatInput from "./chat-input";
import ChatItem from "./chat-item";

const ChatAreaImageItem = () => {
  return (
    <>
      <div className="flex items-center justify-center h-[93.3vh] bg-zinc-700 w-[80%]">
        <div className="flex flex-col justify-between items-center">
          <Image
            src={"/welcome-page.png"}
            alt="welcome"
            width={350}
            height={500}
          />
          <h2 className="text-5xl font-assistant font-extrabold">
            Welcome to Servername
          </h2>
        </div>
      </div>
    </>
  );
};

const ChatAreaItem = () => {
  return (
    <>
      <ChatItem />
      <ChatItem />
    </>
  );
};

const ChatArea = () => {
  return (
    // <ChatAreaImageItem />
    <div className="w-[80%] h-[665px]">
      <ScrollArea
        width="w-[100%]"
        backgroundColor="bg-zinc-700"
        content={<ChatAreaItem />}
        height="h-[88%]"
        padding={true}
      />
      <div className="bg-zinc-700 w-[100%] pb-8">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatArea;
