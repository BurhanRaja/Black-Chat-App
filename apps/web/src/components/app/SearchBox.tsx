import React from "react";

const SearchBox = ({ placeholder }) => {
  return (
    <>
      <div className='flex bg-gray-900 p-1 border-b-2 border-gray-800'>
        <input
          className='text-gray-400 text-sm bg-transparent placeholder:text-gray-600 w-[90%] outline-none'
          placeholder={placeholder}
        />
        <button className='p-1'>
          <i className='fa-solid fa-magnifying-glass text-gray-600'></i>
        </button>
      </div>
    </>
  );
};

export default SearchBox;
