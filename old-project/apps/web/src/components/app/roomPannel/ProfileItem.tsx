import React from "react";
import { BsFillCircleFill, BsThreeDots } from "react-icons/bs";

const ProfileItem = ({ profileImage }) => {
  return (
    <>
      <div className="rounded-lg bg-gray-800 p-3 pt-4 mt-4 flex items-center justify-evenly cursor-pointer">
        <button className="bg-white rounded-lg w-[16%] mr-3">
          <img src={profileImage} className="w-[100%]" alt="profile" />
        </button>
        <div className="w-[70%] text-white" style={{ lineHeight: "23px" }}>
          <p className="mb-0">Burhan Raja</p>
          <p className="flex items-center text-xs text-gray-400">
            <span className="mr-1">
              <BsFillCircleFill className="text-green-500" />
            </span>
            <span>Online</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileItem;
