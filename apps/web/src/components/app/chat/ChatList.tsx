import React from "react";
import ChatInn from "./ChatInn";
import ReplyChat from "./ReplyChat";

const ChatList = () => {
  return (
    <>
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <ChatInn />
        <ReplyChat />
      </div>
    </>
  );
};

export default ChatList;
