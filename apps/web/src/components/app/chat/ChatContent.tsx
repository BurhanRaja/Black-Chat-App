import React from "react";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
import Header from "../Header";
import MemberList from "../channelDetails/MemberList";

const ChatContent = () => {
  return (
    <>
      <div className="w-[100%] bg-gray-950 flex">
        {/* 1150px */}
        <div className="flex flex-col bg-gray-950 w-[960px]">
          <Header />
          <ChatList />
          <ChatInput />
        </div>
        <MemberList />
      </div>
    </>
  );
};

export default ChatContent;
