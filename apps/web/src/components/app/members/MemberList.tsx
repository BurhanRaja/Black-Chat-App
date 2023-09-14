import React from "react";
import MemberItem from "./MemberItem";

const MemberList = () => {
  return (
    <>
      <div className='bg-gray-900 w-[25%] p-3'>
        <div className='flex justify-between mb-3'>
          <p className='text-gray-300'>Users</p>
          <button className='text-gray-300 rounded-full px-1'>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>
        <div className='flex flex-col'>
          <div className='flex mb-2'>
            <p className='text-gray-500 text-sm'>
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
