"use client";
import ScrollArea from "../ui/scroll-area";
import { Plus } from "lucide-react";
import ServerIcon from "./server-icon";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateServerModal from "../modals/create-server";

const ServerPanel = () => {
  const [servers, setServers] = useState<Array<any>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleServerData = async () => {
    const response = await axios.get("/api/server");
    console.log(response.data);
    setServers(response.data.data);
  };

  useEffect(() => {
    handleServerData();
  }, []);

  useEffect(() => {
    if (!openModal) {
      handleServerData();
    }
  }, [openModal]);

  return (
    <>
      <CreateServerModal
        openModal={openModal}
        setOpenModal={(val) => setOpenModal(val)}
      />
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
            {servers.map((el, index) => {
              return (
                <ServerIcon
                  key={el.serverId}
                  image={el.imageUrl}
                  altName={el.name}
                  tooltipText={el.name}
                  link={`/servers/${el?.serverId}/${el.rooms[0].roomId}`}
                />
              );
            })}
            <hr className="border-gray-500" />
            <div onClick={() => setOpenModal(true)}>
              <ServerIcon
                fallback={<Plus size={20} />}
                fallbackBackgroundColor="bg-gray-800 hover:bg-green-600"
                fallbackColor="text-green-600 hover:text-gray-800"
              />
            </div>
          </>
        }
        backgroundColor="bg-zinc-900"
        padding={true}
      ></ScrollArea>
    </>
  );
};

export default ServerPanel;
