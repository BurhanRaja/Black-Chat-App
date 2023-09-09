import React from "react";
import ChannelList from "../../components/app/channelPannel/ChannelPannel";
import RoomPanel from "../../components/app/roomPannel/RoomPanel";
import ChatContent from "../../components/app/chat/ChatContent";
import MemberList from "../../components/app/channelDetails/MemberList";

const AppIndex = () => {
  return (
    <>
      <div className='flex'>
        <ChannelList />
        <RoomPanel />
        <ChatContent />
      </div>
    </>
  );
};

export default AppIndex;
