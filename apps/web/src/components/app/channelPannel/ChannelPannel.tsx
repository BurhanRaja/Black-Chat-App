import React from "react";
import ChannelCon from "./ChannelCon";

const ChannelPannel = () => {
  return (
    <>
      <div className='flex flex-col p-4 bg-gray-900 w-[6%] channel-list-container'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
          return <ChannelCon />;
        })}
      </div>
    </>
  );
};

export default ChannelPannel;
