import React from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";

const ChatInput = () => {
  return (
    <div className="flex justify-center items- mb-6 bg-gray-600 p-2 mx-auto w-[85%] rounded-md">
      <AiFillPlusSquare className="text-white text-4xl mr-3 rounded-md hover:text-blue-400 cursor-pointer" />
      <input className="w-[90%] bg-gray-600 p-1 focus:outline-none text-gray-200" placeholder="Text Message" />
      <RiSendPlaneFill className="text-white text-4xl hover:bg-white hover:text-gray-600 p-1 rounded-md cursor-pointer" />
    </div>
  );
};

export default ChatInput;
