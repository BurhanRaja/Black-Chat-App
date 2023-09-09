import React from "react";
import { AiFillPlusSquare, AiOutlineGif } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = () => {
  return (
    <div className="flex justify-center items-center mb-6 bg-gray-800 p-1.5 mx-auto w-[95%] rounded-md">
      <AiFillPlusSquare className="text-gray-200 text-4xl mr-3 rounded-md hover:text-white cursor-pointer" />
      <input
        className="w-[90%] bg-gray-800 p-1 focus:outline-none text-gray-200"
        placeholder="Text Message"
      />
      {/* <RiSendPlaneFill className="text-white text-4xl hover:bg-white hover:text-gray-600 p-1 rounded-md cursor-pointer" /> */}
      <button className="p-1 bg-gray-200 hover:bg-white mx-2 rounded-md">
        <AiOutlineGif className="text-xl" />
      </button>
      <BsEmojiSmileFill className="text-gray-200 text-4xl p-1 hover:text-yellow-400 cursor-pointer" />
    </div>
  );
};

export default ChatInput;
