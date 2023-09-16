import React from "react";

const ChannelIcon = ({ icon }) => {
  return (
    <>
      <button className={`channel-icon bg-blue-700 p-3 py-[0.7rem] mb-5 mx-auto rounded-lg cursor-pointer text-center`}>
        {icon}
      </button>
    </>
  );
};

export default ChannelIcon;
