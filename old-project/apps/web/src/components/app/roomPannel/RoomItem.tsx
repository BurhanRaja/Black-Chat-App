import React from "react";
import { IoMdSettings } from "react-icons/io";

const RoomItem = ({ name, notifications, roomTypeIcon }) => {
  return (
    <>
      <div className="flex justify-between items-center cursor-pointer mt-1 p-2 px-3 rounded-lg hover:bg-gray-800 group/roomname">
        <p className="text-sm text-gray-400 flex items-center">
          <span>
            {/* Hash Icon */}
            {roomTypeIcon}
          </span>
          <span>{name}</span>
        </p>
        <div className="flex items-center">
          {notifications > 0 ? (
            <button className="text-xs p-0.5 px-1.5 bg-red-500 text-white rounded-lg block group-hover/roomname:hidden">
              3
            </button>
          ) : (
            ""
          )}
          <button className="text-xs p-1 text-gray-500 hover:bg-gray-700 hover:text-gray-100 rounded-lg hidden group-hover/roomname:block">
            {/* Settings icon */}
            <IoMdSettings className="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RoomItem;
