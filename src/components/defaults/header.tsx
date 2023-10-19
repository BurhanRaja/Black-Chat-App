"use client";

import { Hash, Users2 } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-zinc-700 p-3 shadow-md flex justify-between pr-5">
      <div className="flex items-center">
        <Hash size={18} className="mr-1" />
        <p>announcement</p>
      </div>
      <div>
        <Users2 className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
