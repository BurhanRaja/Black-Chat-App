import ChannelSearch from "./room-search";
import ScrollArea from "../ui/scroll-area";
import ProfileItem from "../profile-item";
import { Room, RoomType, SUser, SUserRole, Server } from "@prisma/client";
import RoomPannelTitle from "./room-pannel-title";
import currentProfile from "@/lib/current-profile";
import RoomCollapsible from "./room-collapsible";

export interface ServerProps extends Server {
  rooms: Array<Room>;
  sUsers: Array<SUser>;
}

interface RoomPannelProps {
  server: ServerProps;
  rooms: Array<Room>;
  members: Array<SUser>;
}

const RoomPanel = async ({ server, members, rooms }: RoomPannelProps) => {
  const user = await currentProfile();

  const textRoom = rooms.filter((room) => room.type === RoomType["TEXT"]);
  const audioRoom = rooms.filter((room) => room.type === RoomType["AUDIO"]);
  const videoRoom = rooms.filter((room) => room.type === RoomType["VIDEO"]);

  const isAdmin: boolean =
    user?.userId ===
      members.find((member) => member.type === SUserRole["ADMIN"])?.userId &&
    user?.userId ===
      server.sUsers.find((user) => user.type === "ADMIN")?.userId;

  const isModerator: boolean =
    user?.userId ===
      members.find((member) => member.type === SUserRole["MODERATOR"])
        ?.userId &&
    user?.userId ===
      server.sUsers.find((user) => user.type === "MODERATOR")?.userId;

  return (
    <div className="h-[100vh] bg-[rgb(71,71,79)] pb-2">
      <RoomPannelTitle
        isAdmin={isAdmin}
        isModerator={isModerator}
        server={server}
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
