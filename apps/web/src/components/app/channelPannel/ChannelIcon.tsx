import React from "react";

const ChannelIcon = ({ icon }) => {
  return (
    <>
      <button className='channel-icon bg-blue-700 p-4 py-2.5 mb-5 mx-auto rounded-lg cursor-pointer text-center'>
        {icon}
      </button>
    </>
  );
};

export default ChannelIcon;
