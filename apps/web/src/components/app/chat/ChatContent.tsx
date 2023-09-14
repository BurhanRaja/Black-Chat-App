import React from "react";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
import Header from "../Header";

const ChatContent = () => {
  return (
    <>
      <div className='w-[100%]'>
        <Header memberIcon={""} searchIcon={""} />
        <div className='flex h-[89.5%]'>
          <div className='flex flex-col bg-gray-950 w-[75%]'>
            <ChatList />
            <ChatInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatContent;
