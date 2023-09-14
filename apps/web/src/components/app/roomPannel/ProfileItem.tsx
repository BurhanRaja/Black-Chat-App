import React from "react";

const ProfileItem = () => {
  return (
    <>
      <div className='rounded-lg bg-gray-800 p-3 pt-4 mt-4 flex items-center justify-evenly'>
        <button className='bg-white rounded-lg w-[16%] mr-3'>
          <img src='./polygon.png' className='w-[100%]' alt='profile' />
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
        <button>
          <i className='fa-solid fa-ellipsis font-bold text-xl text-gray-400'></i>
        </button>
      </div>
    </>
  );
};

export default ProfileItem;
