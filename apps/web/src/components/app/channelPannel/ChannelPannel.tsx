import React from "react";
import ChannelCon from "./ChannelCon";

const ChannelPannel = () => {
  return (
    <>
      <div className='flex flex-col py-2 px-3 bg-gray-950 w-[70px] channel-list-container'>
        <ChannelCon />
        <hr className='px-3' />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((el) => {
          return <ChannelCon />;
        })}
        <hr className='px-3' />
        <ChannelCon />
        <ChannelCon />
      </div>
    </>
  );
};

export default ChannelPannel;
