import React from "react";
import ChatInn from "./ChatInn";
import ReplyChat from "./ReplyChat";

const ChatList = () => {
  return (
    <>
      <div className="flex flex-col h-[80%] flex-grow p-4 overflow-y-scroll overflow-x-hidden chat-list">
        <ChatInn />
        <ReplyChat />
        <ChatInn />
        <ReplyChat />
        <ChatInn />
        <ReplyChat />
        <ChatInn />
        <ReplyChat />
        <ChatInn />
      </div>
    </>
  );
};

export default ChatList;
