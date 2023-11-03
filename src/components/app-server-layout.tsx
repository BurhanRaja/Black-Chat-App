"use client";
import ChatArea from "@/components/chat/chat-area";
import MemberPanel from "@/components/members/member-panel";
import MainCommonLayout from "./defaults/main-common-layout";
import ChannelPanel from "./channel/channel-panel";

const AppServerLayout = () => {
  return (
    <>
      <MainCommonLayout
        sidepannel={<ChannelPanel />}
        chatarea={<ChatArea />}
        memberpannel={<MemberPanel />}
      />
    </>
  );
};

export default AppServerLayout;
