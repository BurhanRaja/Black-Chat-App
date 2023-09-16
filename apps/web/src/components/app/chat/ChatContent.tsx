import React from "react";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
import Header from "../Header";
import { BsHash } from "react-icons/bs";
import MemberList from "../members/MemberList";

const ChatContent = () => {
  return (
    <>
      <div className="w-[100%] h-[100%]">
        <Header
          roomName={"General"}
          roomIcon={
            <>
              <BsHash className="text-xl mr-2" />
            </>
          }
        />
        <div className="flex h-[91.3%]">
          <div className="flex flex-col bg-gray-950 w-[75%]">
            <ChatList />
            <div className="pb-7 pt-1">
              <ChatInput />
            </div>
          </div>
          <MemberList />
        </div>
      </div>
    </>
  );
};

export default ChatContent;
