"use client";
import ServerPanel from "@/components/server/server-panel";
import ChannelPanel from "@/components/channel/channel-panel";
import Header from "@/components/defaults/header";
import ChatArea from "@/components/chat/chat-area";
import MemberPanel from "@/components/members/member-panel";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { X } from "lucide-react";

const AppServerLayout = () => {
  const { data: session } = useSession();
  return (
    <>
      {!session?.user.emailVerified && (
        <div className="bg-orange-600 text-white p-3 flex justify-between items-center">
          <div className="flex">
            <p>Please Verify your Email address.</p>
            <Link className="underline ml-1" href={""}>
              Resend Email
            </Link>
            <p className="ml-0.5">?</p>
          </div>
          <button>
            <X />
          </button>
        </div>
      )}
      <div className="flex">
        <ServerPanel />
        <ChannelPanel />
        <div className="content w-[79%]">
          <Header />
          <div className="flex">
            <ChatArea />
            <MemberPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppServerLayout;
