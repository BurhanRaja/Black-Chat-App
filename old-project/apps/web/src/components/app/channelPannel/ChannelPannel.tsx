import React from "react";
import ChannelIcon from "./ChannelIcon";
import ChannelProfileIcon from "./ChannelProfileIcon";
import { FaCompass } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { LuMessagesSquare } from "react-icons/lu";

const ChannelPannel = () => {
  return (
    <>
      <div className="fixed bg-gray-950 p-3 pt-5 h-[100vh] w-[70px] overflow-x-hidden overflow-y-scroll channel-icon-container">
        <ChannelIcon
          icon={
            <>
              <LuMessagesSquare className="font-extrabold text-2xl text-white" />
            </>
          }
        />
        <hr className="mb-5" />
        <ChannelProfileIcon image={"./images/etherum.png"} />
        <ChannelProfileIcon image={"./images/github.png"} />
        <ChannelProfileIcon image={"./images/mozilla.png"} />
        <ChannelProfileIcon image={"./images/polygon.png"} />
        <hr className="mb-5" />
        <ChannelIcon
          icon={
            <>
              <FaCompass className="font-extrabold text-2xl text-white" />
            </>
          }
        />
        <ChannelIcon
          icon={
            <>
              <AiOutlinePlus className="font-extrabold text-2xl text-white" />
            </>
          }
        />
      </div>
    </>
  );
};

export default ChannelPannel;
