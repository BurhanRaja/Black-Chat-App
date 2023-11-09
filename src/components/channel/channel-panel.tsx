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
  PlusSquare,
} from "lucide-react";
import ChannelSearch from "./channel-search";
import Collapsible from "../ui/collapsible";
import ChannelItem from "./channel-item";
import ScrollArea from "../ui/scroll-area";
import ProfileItem from "../profile-item";
import { useParams } from "next/navigation";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Room, RoomType, Server } from "@prisma/client";
import useMutationData from "@/hooks/useMutationData";
import { deleteServer } from "@/handlers/server";
import { AlertContext, ModalContext } from "@/context/createContext";
import { useRouter } from "next/navigation";

interface ChannelCollapsibleProps {
  rooms: Array<Room>;
  type: RoomType;
}

const ChannelCollapsible = ({ rooms, type }: ChannelCollapsibleProps) => {
  let roomTypeFilter = rooms?.filter((el) => el.type === type);

  return (
    <>
      {rooms?.length > 0 && roomTypeFilter.length > 0 ? (
        <Collapsible
          triggerText={`${type} ROOMS`}
          triggerIcon={<></>}
          content={
            <>
              {rooms?.map((room) => {
                if (room.type === type) {
                  return (
                    <ChannelItem
                      key={room?.roomId}
                      title={room?.name}
                      mainIcon={<Hash size={18} />}
                      icons={<Settings size={16} />}
                      backgroundHover="hover:bg-zinc-800 cursor-pointer hover:text-white"
                    />
                  );
                }
              })}
            </>
          }
        />
      ) : (
        ""
      )}
    </>
  );
};

interface ChannelPannelProps {
  rooms: Array<Room>;
}

const ChannelPanel = ({ rooms }: ChannelPannelProps) => {
  const [serverDetails, setServerDetails] = useState<Server>();

  const params = useParams();
  const { onOpen } = useContext(ModalContext);

  // const handleServerDelete = async () => {
  //   const response = await axios.delete(`/api/server/${params?.serverId}`);
  //   if (response.data.success) {
  //     setAlertOpen(true);
  //     setTitle("Success");
  //     setDescription("Server Successfully deleted.");
  //     setType("success");
  //     router.refresh();
  //     router.push("/servers/@me");
  //   } else {
  //     setAlertOpen(true);
  //     setTitle("Error");
  //     setDescription(response.data.message);
  //     setType("error");
  //   }
  // };

  const handleServerDetails = async () => {
    const response = await axios.get(`/api/server/${params?.serverId}`);
    setServerDetails(response.data.data);
  };

  useEffect(() => {
    handleServerDetails();
  }, []);

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
            content: "Create Room",
            link: "",
            textColor: "text-white",
            icon: <PlusSquare size={16} />,
            handleFunction: () => onOpen("createRoom", {}),
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
            // handleFunction: () => handleServerDelete(),
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
        content={
          <div className="mt-2 p-1">
            <ChannelCollapsible rooms={rooms} type="TEXT" />
            <ChannelCollapsible rooms={rooms} type="AUDIO" />
            <ChannelCollapsible rooms={rooms} type="VIDEO" />
          </div>
        }
        padding={false}
      />
      <ProfileItem />
    </div>
  );
};

export default ChannelPanel;
