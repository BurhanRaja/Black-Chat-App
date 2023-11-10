"use client";

import ChatArea from "@/components/chat/chat-area";
import DMPannel from "./dm/dm-pannel";
import MainCommonLayout from "./defaults/main-common-layout";
import { useParams } from "next/navigation";

const AppDMLayout = () => {
  const params = useParams();

  return (
    <>
      <MainCommonLayout
        sidepannel={<DMPannel />}
        chatarea={<ChatArea membersOpen={false} />}
        memberpannel={<></>}
        fullWidth={true}
        serverId={params?.serverId as string}
        roomId={params?.roomId as string}
        setMembersOpen={() => {}}
        membersOpen={false}
      />
    </>
  );
};

export default AppDMLayout;
