"use client";

import Avatar from "../ui/avatar";

interface MemberItemProps {
  image: string;
  name: string;
  userId: string;
}

const MemberItem = ({ image, name, userId }: MemberItemProps) => {
  return (
    <>
      <div className="flex items-center p-2 hover:bg-zinc-800 rounded-md">
        <Avatar
          image={image}
          altname={name}
          width="w-[40px]"
          height="h-[40px]"
        />
        <p className="ml-2">{name}</p>
      </div>
    </>
  );
};

export default MemberItem;
