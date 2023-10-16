import ServerPanel from "@/components/server/server-panel";
import Avatar from "@/components/ui/avatar";
import Tooltip from "@/components/ui/tooltip";
import Image from "next/image";
import { Settings } from "lucide-react";
import Dropdown from "@/components/ui/dropdown";

export default function Home() {
  return (
    <>
      <div className="flex">
        <ServerPanel />
        <div className="w-[250px] bg-zinc-700">
          <Dropdown />
        </div>
      </div>
    </>
  );
}
