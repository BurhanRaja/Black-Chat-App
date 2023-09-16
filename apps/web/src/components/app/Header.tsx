import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import SearchBox from "./SearchBox";

const Header = ({ roomName, roomIcon }) => {
  return (
    <>
      <div className="w-[100%] bg-gray-800 p-3 flex justify-between items-center">
        <p className="text-gray-400 flex items-center">
          <span>{roomIcon}</span>
          <span>{roomName}</span>
        </p>
        <div className="w-[40%] flex items-center justify-between">
          <button className="text-xl text-gray-400 p-1 w-[10%]">
            <FaUserGroup />
          </button>
          <SearchBox width={"w-[90%]"} placeholder={"Search"} />
        </div>
      </div>
    </>
  );
};

export default Header;
