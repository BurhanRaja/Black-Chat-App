"use client";
import Avatar from "@/components/ui/avatar";
import Tooltip from "@/components/ui/tooltip";
import ScrollArea from "../ui/scroll-area";
import { Plus } from "lucide-react";
import ServerIcon from "./server-icon";

const ServerPanel = () => {
  return (
    <>
      <ScrollArea
        width="w-[75px]"
        height="h-[100vh]"
        content={
          <>
            <ServerIcon
              fallbackBackgroundColor={"bg-slate-900 hover:bg-white"}
              fallbackColor={"text-white hover:text-slate-900"}
            />
            <hr className="border-gray-500" />
            <ServerIcon
              image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              altName="First Server"
            />
            <ServerIcon
              image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              altName="First Server"
            />
            <hr className="border-gray-500" />
            <ServerIcon
              fallback={<Plus size={20} />}
              fallbackBackgroundColor="bg-gray-800 hover:bg-green-600"
              fallbackColor="text-green-600 hover:text-gray-800"
            />
          </>
        }
        padding={true}
      ></ScrollArea>
    </>
  );
};

export default ServerPanel;
