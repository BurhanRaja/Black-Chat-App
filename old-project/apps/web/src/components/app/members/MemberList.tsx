import React from "react";
import MemberItem from "./MemberItem";
import { AiOutlineClose } from "react-icons/ai";

const MemberList = () => {
  return (
    <>
      <div className="bg-gray-900 w-[25%] p-3">
        <div className="flex justify-between mb-3">
          <p className="text-gray-300 text-lg">Users</p>
          <button className="text-gray-300 rounded-full px-1">
            <AiOutlineClose className="text-lg" />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex mb-2">
            <p className="text-gray-500 text-sm">
              <span>Admin -</span>
              <span> 9</span>
            </p>
          </div>
          {/* Members List */}
          <MemberItem />
        </div>
      </div>
    </>
  );
};

export default MemberList;
