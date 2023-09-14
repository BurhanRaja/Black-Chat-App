import React from "react";
import ChannelIcon from "./ChannelIcon";
import ChannelProfileIcon from "./ChannelProfileIcon";

const ChannelPannel = () => {
  return (
    <>
      <div className='fixed bg-gray-950 p-3 pt-5 h-[100vh] w-[70px] overflow-x-hidden overflow-y-scroll channel-icon-container'>
        <ChannelIcon icon={""} />
        <hr className='mb-5' />
        <ChannelProfileIcon image={""} />
        <hr className='mb-5' />
        <ChannelIcon icon={""} />
        <ChannelIcon icon={""} />
      </div>
    </>
  );
};

export default ChannelPannel;
