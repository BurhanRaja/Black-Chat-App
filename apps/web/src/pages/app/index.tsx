import React from "react";
import ChannelPannel from "../../components/app/channelPannel/ChannelPannel";
import RoomPannel from "../../components/app/roomPannel/RoomPannel";
import ChatContent from "../../components/app/chat/ChatContent";

const AppIndex = () => {
  return (
    <>
      <div className="flex  h-[100vh]">
        <ChannelPannel />
        <RoomPannel />
        <ChatContent />
      </div>
    </>
  );
};

export default AppIndex;
