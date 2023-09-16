import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBox = ({ placeholder, width }) => {
  return (
    <>
      <div
        className={`flex bg-gray-900 ${width} p-1.5 ps-2 border-b-2 border-gray-800 rounded-md`}
      >
        <input
          className="text-gray-400 text-sm bg-transparent placeholder:text-gray-600 w-[95%] outline-none"
          placeholder={placeholder}
        />
        <button className="p-1">
          <FiSearch className="text-gray-600" />
        </button>
      </div>
    </>
  );
};

export default SearchBox;
