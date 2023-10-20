"use client";

import { Hash, Users2 } from "lucide-react";
import MemberSearch from "../members/member-search";
import Tooltip from "../ui/tooltip";

const Header = () => {
  return (
    <div className="bg-[rgb(71,71,79)] p-3 pb-2 shadow-md flex justify-between pr-5">
      <div className="flex items-center">
        <Hash size={18} className="mr-1" />
        <p>announcement</p>
      </div>
      <div className="flex items-center">
        <MemberSearch />
        <Tooltip trigger={<Users2 className="cursor-pointer" />} content="User's List" side="bottom" />
      </div>
    </div>
  );
};

export default Header;
