"use client";

import { ReactNode, useContext } from "react";
import Header from "@/components/defaults/header";
import { ChatAreaImageItem } from "../chat/chat-messages";
import { MemberPannelContext } from "@/context/createContext";
import { usePathname, useRouter } from "next/navigation";

interface MainCommonLayoutProps {
  memberpannel: ReactNode;
  chatarea: ReactNode;
  fullWidth?: boolean;
  serverId: string;
  roomId?: string;
}

const MainCommonLayout = ({
  memberpannel,
  chatarea,
  serverId,
  roomId,
}: MainCommonLayoutProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className="content w-[79%]">
        <Header />
        <div className="flex">
          {pathname === "/me" && roomId === undefined ? (
            <ChatAreaImageItem />
          ) : (
            chatarea
          )}
          {memberpannel}
        </div>
      </div>
    </>
  );
};

export default MainCommonLayout;
