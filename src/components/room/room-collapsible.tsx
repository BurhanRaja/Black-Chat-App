"use client";

import { Trash2, Hash, Edit2 } from "lucide-react";
import Collapsible from "../ui/collapsible";
import RoomItem from "./room-item";
import { Room, SUserRole } from "@prisma/client";
import { useContext } from "react";
import { ModalContext } from "@/context/createContext";
import { IoVideocam } from "react-icons/io5";
import { AiFillAudio } from "react-icons/ai";

interface ChannelCollapsibleProps {
  rooms: Array<Room>;
  type: string;
  isAdmin: boolean;
  isModerator: boolean;
  url: string;
}

const RoomCollapsible = ({
  rooms,
  type,
  isAdmin,
  isModerator,
  url,
}: ChannelCollapsibleProps) => {
  const { onOpen } = useContext(ModalContext);

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
                  let moderatorDelete =
                    isModerator &&
                    room.deletePermission.includes(SUserRole["MODERATOR"]);
                  let moderatorUpdate =
                    isModerator &&
                    room.updatePermission.includes(SUserRole["MODERATOR"]);

                  return (
                    <RoomItem
                      link={url + `/${room.roomId}`}
                      key={room?.roomId}
                      title={room?.name}
                      mainIcon={
                        room.type === "AUDIO" ? (
                          <AiFillAudio className="text-lg" />
                        ) : room.type === "VIDEO" ? (
                          <IoVideocam className="text-lg" />
                        ) : (
                          <Hash size={18} />
                        )
                      }
                      icons={
                        <>
                          {isAdmin || moderatorDelete ? (
                            <Edit2
                              size={16}
                              className="mr-2 text-gray-400"
                              onClick={() => onOpen("editRoom", { room })}
                            />
                          ) : (
                            ""
                          )}
                          {isAdmin || moderatorUpdate ? (
                            <Trash2
                              size={16}
                              className="text-gray-400"
                              onClick={() => onOpen("deleteRoom", { room })}
                            />
                          ) : (
                            ""
                          )}
                        </>
                      }
                      backgroundHover="hover:bg-zinc-800 cursor-pointer hover:text-white"
                    />
                  );
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

export default RoomCollapsible;
