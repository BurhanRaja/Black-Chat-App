import React from "react";
import ChatInn from "./ChatInn";

const ChatList = () => {
  return (
    <>
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <ChatInn />
      </div>
    </>
  );
};

export default ChatList;
