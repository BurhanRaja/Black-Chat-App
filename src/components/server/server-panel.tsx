import ScrollArea from "../ui/scroll-area";
import ServerIcon from "./server-icon";
import { prisma } from "@/db/client";
import currentProfile from "@/lib/current-profile";
import CreateServerBtn from "./create-server-btn";

interface ServerPannelProps {
  serverId: string;
}

const ServerPanel = async ({ serverId }: ServerPannelProps) => {
  const profile = await currentProfile();

  let servers: Array<any> = [];

  if (!profile) {
    servers = [];
  } else {
    servers = await prisma.server.findMany({
      where: {
        sUsers: {
          some: { userId: profile?.userId },
        },
      },
      include: {
        rooms: true,
      },
    });
  }

  return (
    <div className="fixed">
      <ScrollArea
        width="w-[75px]"
        height="h-[100vh]"
        content={
          <>
            <ServerIcon
              fallbackBackgroundColor={"font-yuji bg-white hover:bg-white"}
              fallbackColor={"text-black font-extrabold text-xl"}
            />
            <hr className="border-gray-500" />
            {servers?.map((el, index) => {
              const defaultRoom = el.rooms.find(
                (room: any) => room.default === true
              );
              return (
                <ServerIcon
                  key={el.serverId}
                  image={el.imageUrl}
                  altName={el.name}
                  tooltipText={el.name}
                  link={`/servers/${el?.serverId}/${defaultRoom.roomId}`}
                  selected={serverId === el.serverId}
                />
              );
            })}
            <hr className="border-gray-500" />
            {/* <Link> */}
            <CreateServerBtn />
            {/* </Link> */}
          </>
        }
        backgroundColor="bg-zinc-900"
        padding={true}
      ></ScrollArea>
    </div>
  );
};

export default ServerPanel;
