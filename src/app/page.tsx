import ServerPanel from "@/components/server/server-panel";
import Avatar from "@/components/ui/avatar";
import Tooltip from "@/components/ui/tooltip";
import Image from "next/image";
import { Settings } from "lucide-react";
import ChannelPanel from "@/components/channel/channel-panel";
import Header from "@/components/defaults/header";
import ChatArea from "@/components/chat/chat-area";
import MemberPanel from "@/components/members/member-panel";
import Register from "@/components/register";
import Login from "@/components/login";


export default function Home() {
  return (
    <>
      {/* <div className="flex">
        <ServerPanel />
        <ChannelPanel />
        <div className="content w-[79%]">
          <Header />
          <div className="flex">
            <ChatArea />
            <MemberPanel />
          </div>
        </div>
      </div> */}
      <Login />
      {/* <Register /> */}
    </>
  );
}
