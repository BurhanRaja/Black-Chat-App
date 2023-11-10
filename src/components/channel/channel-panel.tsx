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
import { ModalContext } from "@/context/createContext";

interface ChannelCollapsibleProps {
  rooms: Array<Room>;
  type: RoomType;
}

const ChannelCollapsible = ({ rooms, type }: ChannelCollapsibleProps) => {
  let roomTypeFilter = rooms?.filter((el) => el.type === type);

  return (
    <>
      {rooms?.length > 0 ? (
        <div className="mb-4">
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
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const ChannelPanel = () => {
  const [serverDetails, setServerDetails] = useState<Server>();
  const [textRoom, setTextRoom] = useState<Array<Room>>([]);
  const [audioRoom, setAudioRoom] = useState<Array<Room>>([]);
  const [videoRoom, setVideoRoom] = useState<Array<Room>>([]);

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

  const handleRoom = async () => {
    const response = await axios.get(`/api/room/server/${params?.serverId}`);
    setTextRoom(response.data.data.textRoom);
    setAudioRoom(response.data.data.audioRoom);
    setVideoRoom(response.data.data.videoRoom);
  };

  const handleServerDetails = async () => {
    const response = await axios.get(`/api/server/${params?.serverId}`);
    setServerDetails(response.data.data);
  };

  useEffect(() => {
    handleServerDetails();
    handleRoom();
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
            <ChannelCollapsible rooms={textRoom} type="TEXT" />
            <ChannelCollapsible rooms={audioRoom} type="AUDIO" />
            <ChannelCollapsible rooms={videoRoom} type="VIDEO" />
          </div>
        }
        padding={false}
      />
      <ProfileItem />
    </div>
  );
};

export default ChannelPanel;
