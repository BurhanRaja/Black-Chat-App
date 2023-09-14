import React from "react";
import SearchBox from "../SearchBox";
import RoomCategory from "./RoomCategory";
import RoomItem from "./RoomItem";
import ProfileItem from "./ProfileItem";

const RoomPannel = () => {
  return (
    <>
      <div className='flex flex-col w-[270px] p-3 ml-[70px] bg-gray-900 h-[100vh]'>
        <SearchBox placeholder={"Search for Rooms"} />
        <ProfileItem />
        <div className='flex flex-col w-[100%] overflow-y-scroll overflow-x-hidden px-1 room-container'>
          <RoomCategory />
          <RoomItem />
        </div>
      </div>
    </>
  );
};

export default RoomPannel;
