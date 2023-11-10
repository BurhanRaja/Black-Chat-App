"use client";
import ChatArea from "@/components/chat/chat-area";
import MemberPanel from "@/components/members/member-panel";
import MainCommonLayout from "./defaults/main-common-layout";
import ChannelPanel from "./channel/channel-panel";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Profile, Room, SUser, Server } from "@prisma/client";

interface CustomUser extends SUser {
  user: Profile;
}

interface ServerDetails extends Server {
  rooms: Array<Room>;
  sUsers: Array<CustomUser>;
}

const AppServerLayout = () => {
  const params = useParams();

  const [serverDetails, setServerDetails] = useState<ServerDetails>();
  const [membersOpen, setMembersOpen] = useState<boolean>(true);

  const handleServerData = async () => {
    if (params?.serverId !== "@me") {
      let response = await axios.get(`/api/server/${params?.serverId}`);
      setServerDetails(response?.data.data);
    }
  };

  useEffect(() => {
    handleServerData();
  }, []);

  return (
    <>
      <MainCommonLayout
        sidepannel={<ChannelPanel />}
        chatarea={<ChatArea membersOpen={membersOpen} />}
        memberpannel={
          <MemberPanel
            membersOpen={membersOpen}
            members={serverDetails?.sUsers}
          />
        }
        serverId={params?.serverId as string}
        roomId={params?.roomId as string}
        setMembersOpen={(val) => setMembersOpen(val)}
        membersOpen={membersOpen}
      />
    </>
  );
};

export default AppServerLayout;
