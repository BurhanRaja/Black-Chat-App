"use client";

import { X } from "lucide-react";
import Avatar from "../ui/avatar";
import Link from "next/link";

interface DMItemProps {
  title: string;
  image: string;
  altname: string;
  backgroundHover?: string;
  link: string;
}

const DMItem = ({
  title,
  image,
  altname,
  backgroundHover,
  link,
}: DMItemProps) => {
  return (
    <>
      <Link href={link}>
        <div
          className={`flex justify-between items-center py-1.5 my-2 p-3 ${backgroundHover} cursor-pointer rounded-md group`}
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
          {/* <div className="justify-between items-center hidden group-hover:flex">
          <X className="text-lg hover:cursor-pointer text-zinc-300" />
        </div> */}
        </div>
      </Link>
    </>
  );
};

export default DMItem;
