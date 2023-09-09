import React from "react";
import Input from "../forms/Input";
import { FiSearch } from "react-icons/fi";
import { BiSolidGroup } from "react-icons/bi";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-gray-800 p-4 py-2">
        <h2 className="text-white">Channel Name</h2>
        <div className="flex items-center w-[22%]">
          <BiSolidGroup className="text-gray-400 hover:text-white cursor-pointer text-2xl mr-3" />
          <div className="flex items-center relative w-[85%]">
            <Input
              type="text"
              value={""}
              setValue={() => {}}
              label=""
              name="search"
              bgColor="bg-gray-900"
              textColor="text-gray-100"
              border="border-none"
              placeHolder="Search"
            />
            <FiSearch className="text-gray-400 absolute right-0 bg-gray-900 p-2 text-4xl cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
