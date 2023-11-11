import { Trash2, Hash, Edit } from "lucide-react";
import ChannelSearch from "./room-search";
import Collapsible from "../ui/collapsible";
import ChannelItem from "./room-item";
import ScrollArea from "../ui/scroll-area";
import ProfileItem from "../profile-item";
import { Room, RoomType, SUser, SUserRole, Server } from "@prisma/client";
import RoomPannelTitle from "./room-pannel-title";
import currentProfile from "@/lib/current-profile";

interface ChannelCollapsibleProps {
  rooms: Array<Room>;
  type: RoomType;
}

interface RoomPannelProps {
  servername: string;
  rooms: Array<Room>;
  members: Array<SUser>;
}

const RoomCollapsible = ({ rooms, type }: ChannelCollapsibleProps) => {
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
                        icons={
                          <>
                            <Edit size={16} />
                            <Trash2 size={16} />
                          </>
                        }
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

const RoomPanel = async ({ servername, members, rooms }: RoomPannelProps) => {
  const user = await currentProfile();

  const textRoom = rooms.filter((room) => room.type === RoomType["TEXT"]);
  const audioRoom = rooms.filter((room) => room.type === RoomType["AUDIO"]);
  const videoRoom = rooms.filter((room) => room.type === RoomType["VIDEO"]);

  const isAdmin =
    user?.userId ===
    members.find((member) => member.type === SUserRole["ADMIN"])?.userId;

  const isModerator =
    user?.userId ===
    members.find((member) => member.type === SUserRole["ADMIN"])?.userId;

  return (
    <div className="h-[100vh] bg-[rgb(71,71,79)] pb-2">
      <RoomPannelTitle serverName={servername} />
      <div className="mt-2 p-1">
        <ChannelSearch />
      </div>
      <ScrollArea
        width="w-[260px]"
        backgroundColor="bg-[rgb(71,71,79)]"
        height="h-[75%]"
        content={
          <div className="mt-2 p-1">
            <RoomCollapsible rooms={textRoom} type="TEXT" />
            <RoomCollapsible rooms={audioRoom} type="AUDIO" />
            <RoomCollapsible rooms={videoRoom} type="VIDEO" />
          </div>
        }
        padding={false}
      />
      <ProfileItem />
    </div>
  );
};

export default RoomPanel;
