"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { X } from "lucide-react";
import { ReactNode, useState } from "react";
import ServerPanel from "@/components/server/server-panel";
import Header from "@/components/defaults/header";
import { useParams } from "next/navigation";
import { ChatAreaImageItem } from "../chat/chat-area";

interface MainCommonLayoutProps {
  sidepannel: ReactNode;
  memberpannel: ReactNode;
  chatarea: ReactNode;
  fullWidth?: boolean;
  serverId: string;
  roomId?: string;
}

const MainCommonLayout = ({
  sidepannel,
  memberpannel,
  chatarea,
  serverId,
  roomId,
}: MainCommonLayoutProps) => {
  const { data: session } = useSession();

  const [resendEmail, setResentEmail] = useState<boolean>(true);

  return (
    <>
      {sidepannel}
      <div className="content w-[79%]">
        <Header />
        <div className="flex">
          {serverId === "%40me" && roomId === undefined ? (
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
