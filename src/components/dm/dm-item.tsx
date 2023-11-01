"use client";

import { X } from "lucide-react";
import Avatar from "../ui/avatar";

interface DMItemProps {
  title: string;
  image: string;
  altname: string;
  backgroundHover?: string;
}

const DMItem = ({ title, image, altname, backgroundHover }: DMItemProps) => {
  return (
    <>
      <div
        className={`flex justify-between items-center p-3 ${backgroundHover} cursor-pointer rounded-md group`}
      >
        <div className="flex items-center text-sm">
          <Avatar
            image={image}
            altname={altname}
            width="w-[40px]"
            height="h-[40px]"
          />
          <p className="ml-2">{title}</p>
        </div>
        <div className="justify-between items-center hidden group-hover:flex">
          <X className="text-lg hover:cursor-pointer text-zinc-300" />
        </div>
      </div>
    </>
  );
};

export default DMItem;
