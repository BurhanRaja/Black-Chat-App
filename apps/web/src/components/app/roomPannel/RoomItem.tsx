import React from "react";

const RoomItem = () => {
  return (
    <>
      <div className='flex justify-between items-center cursor-pointer mt-1 p-2 px-3 rounded-lg hover:bg-gray-800 group/roomname'>
        <p className='text-sm text-gray-400'>
          <span>
            {/* Hash Icon */}
            <i className='fa-solid fa-hashtag mr-2'></i>
          </span>
          <span>Name of Room</span>
        </p>
        <div className='flex items-center'>
          <button className='text-xs p-0.5 px-1.5 bg-red-500 text-white rounded-lg block group-hover/roomname:hidden'>
            3
          </button>
          <button className='text-xs p-0.5 px-1 text-gray-500 hover:bg-gray-700 hover:text-gray-100 rounded-lg hidden group-hover/roomname:block'>
            {/* Settings icon */}
            <i className='fa-solid fa-gear'></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default RoomItem;
