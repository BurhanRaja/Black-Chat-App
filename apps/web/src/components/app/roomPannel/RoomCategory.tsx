import React from "react";

const RoomCategory = () => {
  return (
    <>
      <div className='mt-4 p-1 cursor-pointer flex items-center justify-between'>
        <p className='text-xs text-gray-500'>
          <span>
            {/* Down Chevron Icon */}
            <i className='fa-solid fa-chevron-down mr-2'></i>
          </span>
          <span>Room Category</span>
        </p>
        <button>
          {/* Plus Icon */}
          <i className='fa-solid fa-plus text-xs p-1 px-2 text-gray-500 hover:bg-gray-700 hover:text-gray-100 rounded-lg'></i>
        </button>
      </div>
    </>
  );
};

export default RoomCategory;
