import React from "react";
import { AiFillPlusSquare, AiOutlineGif } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = () => {
  return (
    <>
      <div className='flex justify-center bg-gray-900 p-1 py-2 border-gray-800 w-[90%] mx-auto rounded-md'>
        <button className='p-1 text-gray-600 hover:text-gray-400 font-extrabold rounded-md'>
          <i className='fa-solid fa-plus font-extrabold text-xl'></i>
        </button>
        <input
          className='text-gray-400 ps-2 text-sm bg-transparent placeholder:text-gray-600 w-[90%] outline-none'
          placeholder='Search for Rooms'
        />
        <button className='p-1 px-1.5 text-gray-600 hover:text-gray-500 font-extrabold rounded-md'>
          GIF
        </button>
        <button className='p-1 px-1.5 text-gray-600 hover:text-yellow-500 rounded-md'>
          <i className='fa-solid fa-face-smile text-lg'></i>
        </button>
      </div>
    </>
  );
};

export default ChatInput;
