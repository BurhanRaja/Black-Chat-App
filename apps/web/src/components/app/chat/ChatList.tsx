import React from "react";
import ChatInn from "./ChatInn";
import ReplyChat from "./ReplyChat";

const ChatList = () => {
  return (
    <>
      <div className="flex flex-col flex-grow h-0 p-4 pt-12 overflow-y-scroll overflow-x-hidden chat-list">
        <ChatInn />
        <ReplyChat />
        <ChatInn />
        <ReplyChat />
        <ChatInn />
        <ReplyChat />
        <ChatInn />
        <ReplyChat />
        <ChatInn />
        <ReplyChat />
      </div>
    </>
  );
};

export default ChatList;
