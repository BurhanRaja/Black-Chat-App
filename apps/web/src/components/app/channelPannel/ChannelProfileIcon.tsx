import React from "react";

const ChannelProfileIcon = ({ image }) => {
  return (
    <>
      <button className='channel-icon mb-5 bg-white p-1.5 rounded-lg'>
        <img src={image} className='w-[100%]' alt='' />
      </button>
    </>
  );
};

export default ChannelProfileIcon;
