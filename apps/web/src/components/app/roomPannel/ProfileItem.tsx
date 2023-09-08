import React from "react";
import Image from "next/image";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";

const ProfileItem = () => {
  return (
    <>
      <div className='flex p-2 px-3 h-12 items-center justify-between bg-gray-700 rounded-md'>
        <div className='flex h-[100%]'>
          <Image
            src='/images/sideImage.jpg'
            alt='profile'
            width={30}
            height={30}
            className='rounded-full mr-2'
          />
          <div className='text-white font-bold text-sm leading-4'>
            <p className='mb-0'>Burhan Raja</p>
            <p className='' style={{ fontSize: "0.6rem" }}>
              Online
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileItem;
