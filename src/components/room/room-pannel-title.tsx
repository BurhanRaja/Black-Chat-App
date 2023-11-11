"use client";
import Dropdown from "../ui/dropdown";
import {
  ChevronDown,
  Settings,
  UserPlus2,
  Trash2,
  Plus,
  Hash,
  PlusSquare,
} from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "@/context/createContext";

interface RoomPannelTitleProps {
  serverName: string;
}

const RoomPannelTitle = ({ serverName }: RoomPannelTitleProps) => {
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

  return (
    <>
      <Dropdown
        trigger={
          <button className="flex justify-between items-center p-3 shadow-md focus:outline-0 w-[100%] rounded-sm hover:bg-zinc-600">
            <span>{serverName}</span>
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
    </>
  );
};

export default RoomPannelTitle;
