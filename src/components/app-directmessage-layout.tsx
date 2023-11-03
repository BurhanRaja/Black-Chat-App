"use client";

import ChatArea from "@/components/chat/chat-area";
import DMPannel from "./dm/dm-pannel";
import MainCommonLayout from "./defaults/main-common-layout";

const AppDMLayout = () => {
  return (
    <>
      <MainCommonLayout
        sidepannel={<DMPannel />}
        chatarea={<ChatArea />}
        memberpannel={<></>}
        fullWidth={true}
      />
    </>
  );
};

export default AppDMLayout;
