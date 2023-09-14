import React from "react";
import Input from "../forms/Input";
import { FiSearch } from "react-icons/fi";
import { BiSolidGroup } from "react-icons/bi";
import SearchBox from "./SearchBox";

const Header = ({ memberIcon, searchIcon }) => {
  return (
    <>
      <div className='w-[100%] bg-gray-800 p-3 flex justify-between items-center'>
        <p className='text-gray-400'>
          <span>
            <i className='fa-solid fa-hashtag mr-2'></i>
          </span>
          <span>Name of Room</span>
        </p>
        <div className='w-[40%] flex items-center justify-between'>
          <button className='text-xl text-gray-400 p-1 w-[10%]'>
            {memberIcon}
          </button>
          <SearchBox placeholder={"Search"} />
        </div>
      </div>
    </>
  );
};

export default Header;
