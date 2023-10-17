import ServerPanel from "@/components/server/server-panel";
import Avatar from "@/components/ui/avatar";
import Tooltip from "@/components/ui/tooltip";
import Image from "next/image";
import { Settings } from "lucide-react";
import ChannelPanel from "@/components/channel/channel-panel";

export default function Home() {
  return (
    <>
      <div className="flex">
        <ServerPanel />
        <ChannelPanel />
      </div>
    </>
  );
}
