"use client";

import { Profile, SUser } from "@prisma/client";
import ScrollArea from "../ui/scroll-area";
import MemberItem from "./member-item";
import { useContext } from "react";
import { MemberPannelContext } from "@/context/createContext";

interface CustomUser extends SUser {
  user: Profile;
}
interface MemberPannel {
  members: Array<CustomUser> | undefined;
}

const MemberPanel = ({ members }: MemberPannel) => {
  const { memberPannelOpen } = useContext(MemberPannelContext);

  console.log(members?.map((el) => el.user.connected));

  return (
    <>
      <ScrollArea
        width={memberPannelOpen ? "w-[20%]" : "w-[0]"}
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
                  isOnline={member.user.connected}
                />
              );
            })}
          </>
        }
        padding={memberPannelOpen}
        backgroundColor="bg-[rgb(56,56,64)]"
      />
    </>
  );
};

export default MemberPanel;
