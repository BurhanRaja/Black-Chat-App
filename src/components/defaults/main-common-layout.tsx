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
      {!session?.user.emailVerified && resendEmail && (
        <div className="bg-orange-600 text-white p-3 flex justify-between items-center">
          <div className="flex">
            <p>Please Verify your Email address.</p>
            <Link className="underline ml-1" href={""}>
              Resend Email
            </Link>
            <p className="ml-0.5">?</p>
          </div>
          <button onClick={() => setResentEmail(false)}>
            <X />
          </button>
        </div>
      )}
      <div className="flex">
        <ServerPanel />
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
      </div>
    </>
  );
};

export default MainCommonLayout;
