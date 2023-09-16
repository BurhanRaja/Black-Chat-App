import React from "react";
import { BsFillCircleFill } from "react-icons/bs";

const MemberItem = () => {
  return (
    <>
      <div className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
        <button className="bg-white rounded-lg w-[16%] mr-3">
          <img src="./images/polygon.png" className="w-[100%]" alt="" />
        </button>
        <div className="w-[70%] text-white" style={{ lineHeight: "23px" }}>
          <p className="mb-0">Burhan Raja</p>
          <p className="text-xs text-gray-400 flex items-center">
            <span className="mr-1">
              <BsFillCircleFill  className="text-green-500" />
            </span>
            <span>Online</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default MemberItem;
