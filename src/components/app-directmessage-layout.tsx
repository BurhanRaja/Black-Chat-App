"use client";

import ChatArea from "@/components/chat/chat-area";
import DMPannel from "./dm/dm-pannel";
import MainCommonLayout from "./defaults/main-common-layout";
import { useParams } from "next/navigation";

const AppDMLayout = () => {
  const { serverId, roomId } = useParams();
  return (
    <>
      <MainCommonLayout
        sidepannel={<DMPannel />}
        chatarea={<ChatArea />}
        memberpannel={<></>}
        fullWidth={true}
        serverId={serverId}
        roomId={roomId}
      />
    </>
  );
};

export default AppDMLayout;
