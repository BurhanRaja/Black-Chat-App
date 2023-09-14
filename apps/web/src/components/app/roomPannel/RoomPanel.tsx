import React from "react";
import RoomItem from "./RoomItem";
import ProfileItem from "./ProfileItem";
import { CiLogout } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import Input from "../../forms/Input";

const RoomPanel = () => {
  let dropDown = [
    {
      link: "",
      name: (
        <>
          <p className='flex justify-between items-center text-red-500 font-bold'>
            Leave Channel <CiLogout className='font-bold text-lg' />
          </p>
        </>
      ),
    },
  ];
  return (
    <>
      <div className='flex flex-col bg-gray-900 w-[566px] p-3 pb-0 pr-0 ms-16 h-[100vh]'>
        <div className='px-1 bg-gray-900'>
          <div className='mb-3'>
            <ProfileItem />
          </div>
        </div>
        <div className='bg-gray-900'>
          <div className='mx-2 mr-3 flex justify-between items-center'>
            <Input
              type='text'
              value={""}
              setValue={() => {}}
              label=''
              name='search'
              bgColor='bg-gray-900'
              textColor='text-gray-100'
              border='border-none'
              placeHolder='Browse Room'
            />
            <FiSearch className='text-gray-400 text-lg cursor-pointer hover:text-white' />
          </div>
        </div>
        <hr className='w-[90%] mx-auto border-gray-600' />
        <div className='flex flex-col bg-gray-900 w-[100%] overflow-y-scroll overflow-x-hidden room-panel-container p-1'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((el) => {
            return (
              <RoomItem type='chat' name='Room Name Anyy' notifications={0} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RoomPanel;
