import React from "react";
import SearchBox from "../SearchBox";
import RoomCategory from "./RoomCategory";
import RoomItem from "./RoomItem";
import ProfileItem from "./ProfileItem";
import { BsHash } from "react-icons/bs";
import { BiSolidUserVoice } from "react-icons/bi";

const RoomPannel = () => {
  return (
    <>
      <div className="flex flex-col w-[360px] p-3 ml-[70px] bg-gray-900 h-[100%]">
        <SearchBox width={"w-[100%]"} placeholder={"Search for Rooms"} />
        <ProfileItem profileImage={"./images/polygon.png"} />
        <div className="flex flex-col w-[100%] overflow-y-scroll overflow-x-hidden px-1 room-container">
          <RoomCategory roomname="Text Channel" />
          <RoomItem
            name={"General"}
            notifications={0}
            roomTypeIcon={<BsHash className="text-lg mr-2" />}
          />
          <RoomCategory roomname="Voice Channel" />
          <RoomItem
            name={"General"}
            notifications={0}
            roomTypeIcon={<BiSolidUserVoice className="text-lg mr-2" />}
          />
        </div>
      </div>
    </>
  );
};

export default RoomPannel;
