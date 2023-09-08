import React from "react";
import ChannelList from "../../components/app/channelPannel/ChannelPannel";
import RoomPanel from "../../components/app/roomPannel/RoomPanel";

const AppIndex = () => {
  return (
    <>
      <div className='flex'>
        <ChannelList />
        <RoomPanel />
      </div>
    </>
  );
};

export default AppIndex;
