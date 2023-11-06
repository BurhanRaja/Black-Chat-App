import ScrollArea from "../ui/scroll-area";
import ServerIcon from "./server-icon";
import CreateServerModal from "../modals/create-server";
import { prisma } from "@/db/client";
import currentProfile from "@/lib/current-profile";
import CreateServerBtn from "./create-server-btn";

const ServerPanel = async () => {
  const profile = await currentProfile();

  let servers: Array<any> = [];

  if (!profile) {
    servers = [];
  } else {
    servers = await prisma.server.findMany({
      where: {
        sUsers: {
          some: { userId: profile?.id },
        },
      },
      include: {
        rooms: true,
      },
    });
  }

  return (
    <>
      <CreateServerModal />
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
              return (
                <ServerIcon
                  key={el.serverId}
                  image={el.imageUrl}
                  altName={el.name}
                  tooltipText={el.name}
                  link={`/servers/${el?.serverId}/${el?.rooms[0].roomId}`}
                />
              );
            })}
            <hr className="border-gray-500" />
            <CreateServerBtn />
          </>
        }
        backgroundColor="bg-zinc-900"
        padding={true}
      ></ScrollArea>
    </>
  );
};

export default ServerPanel;
