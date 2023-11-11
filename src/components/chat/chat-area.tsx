"use client";
import ScrollArea from "../ui/scroll-area";
import Image from "next/image";
import ChatInput from "./chat-input";
import ChatItem from "./chat-item";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { MemberPannelContext } from "@/context/createContext";
import ChatAreaLayout from "./chat-area-layout";

export const ChatAreaImageItem = () => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`flex items-center justify-center h-[93.3vh] bg-zinc-700 ${
          pathname === "/me" ? "w-full" : "w-[80%]"
        }`}
      >
        <div className="flex flex-col justify-between items-center">
          <Image
            src={"/welcome-page.png"}
            alt="welcome"
            width={350}
            height={500}
          />
          <h2 className="text-5xl font-assistant font-extrabold">Blackchat</h2>
        </div>
      </div>
    </>
  );
};

const ChatArea = () => {
  const { memberPannelOpen } = useContext(MemberPannelContext);

  return (
    <ChatAreaLayout>
      <ScrollArea
        width="w-[100%]"
        backgroundColor="bg-zinc-700"
        content={
          <>
            <ChatItem />
            <ChatItem />
          </>
        }
        height="h-[88%]"
        padding={true}
      />
      <div className="bg-zinc-700 w-[100%] pb-8">
        <ChatInput />
      </div>
    </ChatAreaLayout>
  );
};

export default ChatArea;
