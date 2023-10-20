"use client";

import Avatar from "../ui/avatar";

const MemberItem = () => {
  return (
    <>
      <div className="flex items-center p-2 hover:bg-zinc-800 rounded-md">
        <Avatar
          image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          altname="anyprofilename"
          width="w-[40px]"
          height="h-[40px]"
        />
        <p className="ml-2">BurhanRaja</p>
      </div>
    </>
  );
};

export default MemberItem;
