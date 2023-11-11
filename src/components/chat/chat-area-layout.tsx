"use client";

import { MemberPannelContext } from "@/context/createContext";
import { useContext } from "react";

interface ChatAreaLayoutProps {
  children: React.ReactNode;
}

const ChatAreaLayout = ({ children }: ChatAreaLayoutProps) => {
  const { memberPannelOpen } = useContext(MemberPannelContext);

  return (
    <>
      <div className={`${!memberPannelOpen ? "w-full" : "w-[80%]"} h-[665px]`}>
        {children}
      </div>
    </>
  );
};

export default ChatAreaLayout;
