import React, { FunctionComponent } from "react";
import { BiHash } from "react-icons/bi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { AiFillNotification, AiOutlineSearch } from "react-icons/ai";
import { RoomItemProps } from "../../../types";

const RoomItem: FunctionComponent<RoomItemProps> = ({
  type = "chat",
  notifications = 0,
  name,
}) => {
  return (
    <>
      <div className='flex my-0.5 justify-between group/roomitem items-center cursor-pointer rounded-md p-3 hover:bg-gray-700'>
        <div className='flex items-center justify-start w-[85%] font-medium text-gray-300 group-hover/roomitem:text-gray-200'>
          {type === "chat" ? (
            <BiHash className='mr-3' />
          ) : type === "anouncement" ? (
            <AiFillNotification className='mr-3' />
          ) : type === "search" ? (
            <AiOutlineSearch className='mr-3' />
          ) : (
            <HiOutlineSpeakerWave className='mr-3' />
          )}
          <p className='text-sm'>
            {name.length > 15 ? name.substring(0, 15) + "..." : name}
          </p>
        </div>
        {notifications === 0 ? (
          ""
        ) : (
          <div className='text-xs p-0.5 px-1 text-white font-medium rounded-full bg-red-500'>
            {notifications}
          </div>
        )}
      </div>
    </>
  );
};

export default RoomItem;
