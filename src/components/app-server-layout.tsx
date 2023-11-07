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

  const handleServerData = async () => {
    if (params?.serverId !== "@me") {
      let response = await axios.get(
        `http://localhost:3000/api/server/${params?.serverId}`
      );
      setServerDetails(response?.data.data);
    }
  };

  useEffect(() => {
    handleServerData();
  }, []);

  console.log(serverDetails);

  return (
    <>
      <MainCommonLayout
        sidepannel={<ChannelPanel rooms={serverDetails?.rooms} />}
        chatarea={<ChatArea />}
        memberpannel={<MemberPanel members={serverDetails?.sUsers} />}
        serverId={params?.serverId as string}
        roomId={params?.roomId as string}
      />
    </>
  );
};

export default AppServerLayout;
