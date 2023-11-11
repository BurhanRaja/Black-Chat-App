import ChannelSearch from "./room-search";
import ScrollArea from "../ui/scroll-area";
import ProfileItem from "../profile-item";
import { Room, RoomType, SUser, SUserRole } from "@prisma/client";
import RoomPannelTitle from "./room-pannel-title";
import currentProfile from "@/lib/current-profile";
import RoomCollapsible from "./room-collapsible";

interface RoomPannelProps {
  servername: string;
  rooms: Array<Room>;
  members: Array<SUser>;
}

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
    members.find((member) => member.type === SUserRole["MODERATOR"])?.userId;

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
            <RoomCollapsible
              rooms={textRoom}
              type="Text"
              isAdmin={isAdmin}
              isModerator={isModerator}
            />
            <RoomCollapsible
              rooms={audioRoom}
              type="Audio"
              isAdmin={isAdmin}
              isModerator={isModerator}
            />
            <RoomCollapsible
              rooms={videoRoom}
              type="Video"
              isAdmin={isAdmin}
              isModerator={isModerator}
            />
          </div>
        }
        padding={false}
      />
      <ProfileItem />
    </div>
  );
};

export default RoomPanel;
