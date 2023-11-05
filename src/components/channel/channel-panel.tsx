"use client";
import Dropdown from "../ui/dropdown";
4;
import {
  ChevronDown,
  Settings,
  UserPlus2,
  Trash2,
  Plus,
  Hash,
} from "lucide-react";
import ChannelSearch from "./channel-search";
import Collapsible from "../ui/collapsible";
import ChannelItem from "./channel-item";
import ScrollArea from "../ui/scroll-area";
import ProfileItem from "../profile-item";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Server } from "@prisma/client";
import useMutationData from "@/hooks/useMutationData";
import { deleteServer } from "@/handlers/server";

const ChannelCollapsible = () => {
  return (
    <>
      <Collapsible
        triggerText="TEXT CHANNEL"
        triggerIcon={
          <Plus
            size={25}
            className="hover:bg-zinc-800 p-1 rounded-sm text-white"
          />
        }
        content={
          <>
            <ChannelItem
              title="announcement"
              mainIcon={<Hash size={18} />}
              icons={<Settings size={16} />}
              backgroundHover="hover:bg-zinc-800 cursor-pointer hover:text-white"
            />
          </>
        }
      />
    </>
  );
};

const ChannelPannelContent = () => {
  return (
    <>
      <div className="mt-2 p-1">
        <ChannelCollapsible />
        <ChannelCollapsible />
      </div>
    </>
  );
};

const ChannelPanel = () => {
  const params = useParams();

  const [serverDetails, setServerDetails] = useState<Server>();

  const handleServerData = async () => {
    const response = await axios.delete(`/api/server/${params?.serverId}`);
    setServerDetails(response.data.data);
  };

  useEffect(() => {
    handleServerData();
  }, []);

  const { isSuccess, isError, mutate } = useMutationData({
    func: deleteServer,
  });

  return (
    <div className="h-[100vh] bg-[rgb(71,71,79)] pb-2">
      <Dropdown
        trigger={
          <button className="flex justify-between items-center p-3 shadow-md focus:outline-0 w-[100%] rounded-sm hover:bg-zinc-600">
            <span>{serverDetails?.name}</span>
            <ChevronDown />
          </button>
        }
        items={[
          {
            content: "Invite People",
            link: "",
            textColor: "text-violet-400",
            icon: <UserPlus2 size={16} />,
          },
          {
            content: "Server Settings",
            link: "",
            textColor: "text-white",
            icon: <Settings size={16} />,
          },
          {
            content: "Delete Server",
            link: "",
            textColor: "text-red-500",
            icon: <Trash2 size={16} />,
          },
        ]}
        contentColor="bg-gray-950 mt-2"
        contentWidth="w-[225px]"
      />
      <div className="mt-2 p-1">
        <ChannelSearch />
      </div>
      <ScrollArea
        width="w-[260px]"
        backgroundColor="bg-[rgb(71,71,79)]"
        height="h-[75%]"
        content={<ChannelPannelContent />}
        padding={false}
      />
      <ProfileItem />
    </div>
  );
};

export default ChannelPanel;
