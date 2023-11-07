"use client";

import { Profile, SUser } from "@prisma/client";
import ScrollArea from "../ui/scroll-area";
import MemberItem from "./member-item";

interface CustomUser extends SUser {
  user: Profile;
}
interface MemberPannel {
  members: Array<CustomUser> | undefined;
}

const MemberPanel = ({ members }: MemberPannel) => {
  console.log(members);
  return (
    <>
      <ScrollArea
        width="w-[20%]"
        height="h-[93.3vh]"
        content={
          <>
            {members?.map((member) => {
              return (
                <MemberItem
                  userId={member.userId}
                  name={member.user.displayname}
                  image={member.user.imageUrl}
                />
              );
            })}
          </>
        }
        padding
        backgroundColor="bg-[rgb(56,56,64)]"
      />
    </>
  );
};

export default MemberPanel;
