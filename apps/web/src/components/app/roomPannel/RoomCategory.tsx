import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSolidChevronDown } from "react-icons/bi";

const RoomCategory = ({ roomname }) => {
  return (
    <>
      <div className="mt-4 p-1 cursor-pointer flex items-center justify-between">
        <p className="text-xs text-gray-500 flex items-center">
          <span>
            {/* Down Chevron Icon */}
            <BiSolidChevronDown className="mr-2 text-xl" />
          </span>
          <span className="font-bold">{roomname}</span>
        </p>
        <button className=" p-1 text-gray-500 hover:bg-gray-700 hover:text-gray-100 rounded-lg">
          {/* Plus Icon */}
          <AiOutlinePlus />
        </button>
      </div>
    </>
  );
};

export default RoomCategory;
