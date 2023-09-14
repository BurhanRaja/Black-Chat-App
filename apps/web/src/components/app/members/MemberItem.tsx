import React from "react";

const MemberItem = () => {
  return (
    <>
      <div className='flex items-center p-2 hover:bg-gray-800'>
        <button className='bg-white rounded-lg w-[16%] mr-3'>
          <img src='./polygon.png' className='w-[100%]' alt='' />
        </button>
        <div className='w-[70%] text-white' style={{ lineHeight: "20px" }}>
          <p className='mb-0'>Burhan Raja</p>
          <p className='text-xs text-gray-400'>
            <span className='mr-1'>
              <i className='fa-solid fa-circle text-green-500'></i>
            </span>
            <span>Online</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default MemberItem;
