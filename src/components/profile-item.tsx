"use client";
import { MoreHorizontal } from "lucide-react";
import Avatar from "./ui/avatar";

const ProfileItem = () => {
  return (
    <>
      <div className="flex justify-between items-center p-3 mx-1 bg-neutral-800 rounded-xl">
        <div className="flex items-center">
          <Avatar
            image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            altname="Profile-Item"
            transition={false}
          />
          <p className="ml-2">BurhanRaja</p>
        </div>
        <MoreHorizontal className="text-gray-400" />
      </div>
    </>
  );
};

export default ProfileItem;
