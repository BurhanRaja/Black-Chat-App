"use client";

import { Profile, SUser } from "@prisma/client";
import ScrollArea from "../ui/scroll-area";
import MemberItem from "./member-item";

interface CustomUser extends SUser {
  user: Profile;
}
interface MemberPannel {
  members: Array<CustomUser> | undefined;
  membersOpen: boolean;
}

const MemberPanel = ({ members, membersOpen }: MemberPannel) => {
  console.log(members);
  return (
    <>
      <ScrollArea
        width={membersOpen ? "w-[20%]" : "w-[0]"}
        height={"h-[93.3vh]"}
        content={
          <>
            {members?.map((member) => {
              return (
                <MemberItem
                  key={member.userId}
                  userId={member.userId}
                  name={member.user.displayname}
                  image={member.user.imageUrl}
                />
              );
            })}
          </>
        }
        padding={membersOpen}
        backgroundColor="bg-[rgb(56,56,64)]"
      />
    </>
  );
};

export default MemberPanel;
