import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const MemberList = () => {
  return (
    <>
      <div className=" w-[20%] p-2 pt-24 bg-gray-900 relative">
        <div className="flex justify-end absolute right-2 top-16 mb-2 mt-1">
          <AiOutlineClose className="text-gray-700 p-1 text-2xl cursor-pointer bg-slate-400 hover:text-white hover:bg-gray-800 rounded-3xl" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center hover:bg-gray-800 p-3 py-2 cursor-pointer rounded-md">
            <div
              className="flex-shrink-0 h-8 w-8 rounded-full mr-2"
              style={{
                backgroundImage: `url(/images/sideImage.jpg)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            ></div>
            <p className="text-white text-sm">UserName</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberList;
