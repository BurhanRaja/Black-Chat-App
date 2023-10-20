"use client";
import { Search } from "lucide-react";

const MemberSearch = () => {
  return (
    <>
      <div className="flex justify-start items-center relative px-0.5 mr-3">
        <Search className="absolute left-2.5 text-zinc-500" size={17} />
        <input
          className="p-1 pl-8 w-[100%] rounded-md bg-[rgb(43,43,47)] outline-none text-zinc-500 channel-search text-sm"
          placeholder="Search"
        />
      </div>
    </>
  );
};

export default MemberSearch;
