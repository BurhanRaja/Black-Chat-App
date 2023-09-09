import React from "react";
import Image from "next/image";
import { BiSolidCircle } from "react-icons/bi";
import { LuMoreHorizontal } from "react-icons/lu";

const ProfileItem = () => {
  return (
    <>
      <div className="p-4 bg-gray-700 cursor-pointer hover:bg-gray-800 rounded-2xl mx-2 my-3">
        <div className="flex">
          <Image
            src="/images/sideImage.jpg"
            alt="profile"
            width={40}
            height={30}
            className="rounded-full mr-2"
          />
          <div className="text-white font-bold text-sm leading-3 flex items-center justify-between w-[80%]">
            <div>
              <p className="mb-0 text-lg">Burhan Raja</p>
              <p className="flex items-center justify-start" style={{ fontSize: "0.6rem" }}>
                <BiSolidCircle className="text-green-500 mr-0.5" />
                <span>Online</span>
              </p>
            </div>
            <LuMoreHorizontal className="text-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileItem;
