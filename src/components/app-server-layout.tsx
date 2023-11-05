"use client";
import ChatArea from "@/components/chat/chat-area";
import MemberPanel from "@/components/members/member-panel";
import MainCommonLayout from "./defaults/main-common-layout";
import ChannelPanel from "./channel/channel-panel";
import { useParams } from "next/navigation";

const AppServerLayout = () => {
  const params = useParams();

  return (
    <>
      <MainCommonLayout
        sidepannel={<ChannelPanel />}
        chatarea={<ChatArea />}
        memberpannel={<MemberPanel />}
        serverId={params?.serverId as string}
        roomId={params?.roomId as string}
      />
    </>
  );
};

export default AppServerLayout;
