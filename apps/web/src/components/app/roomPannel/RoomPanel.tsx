import React from "react";
import RoomItem from "./RoomItem";
import ProfileItem from "./ProfileItem";
import Dropdown from "../../forms/Dropdown";
import { CiLogout } from "react-icons/ci";
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
      <div className='flex flex-col bg-gray-900 w-[22%] p-3 pb-0 pr-0 ms-16 h-[100vh]'>
        <div className='bg-gray-900'>
          <Dropdown
            color='hover:bg-gray-800 mb-3'
            name='Channel Name'
            mappedData={dropDown}
          />
        </div>
        <div className='px-1 pt-1 bg-gray-800'>
          <div className='mb-3'>
            <ProfileItem />
          </div>
          <Input
            type='text'
            value={""}
            setValue={() => {}}
            label=''
            name='search'
            bgColor='bg-gray-800'
            textColor='text-gray-100'
            border='border-gray-600'
            placeHolder='Search Room'
          />
        </div>
        <div className='flex flex-col bg-gray-800 w-[100%] overflow-y-scroll overflow-x-hidden room-panel-container p-1'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((el) => {
            return (
              <RoomItem type='chat' name='Room Name Anyy' notifications={10} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RoomPanel;
