"use client";
import Dropdown from "../ui/dropdown";
4;
import { ChevronDown, Settings, UserPlus2, Trash2 } from "lucide-react";
import ChannelSearch from "./channel-search";

const ChannelPanel = () => {
  return (
    <div className="w-[250px] bg-zinc-700">
      <Dropdown
        trigger={
          <button className="flex justify-between items-center p-3 shadow-md focus:outline-0 w-[100%] rounded-sm hover:bg-zinc-600">
            <span>ServeName</span>
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
        contentColor="bg-gray-950"
        contentWidth="w-[225px]"
      />
      <div className="mt-2 p-1">
            <ChannelSearch />
      </div>
    </div>
  );
};

export default ChannelPanel;
