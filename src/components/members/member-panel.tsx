"use client";

import ScrollArea from "../ui/scroll-area";
import MemberItem from "./member-item";

const MemberPanel = () => {
  return (
    <>
      <ScrollArea
        width="w-[20%]"
        height="h-[92.7vh]"
        content={
          <>
            <MemberItem />
          </>
        }
        padding
        backgroundColor="bg-[rgb(56,56,64)]"
      />
    </>
  );
};

export default MemberPanel;
