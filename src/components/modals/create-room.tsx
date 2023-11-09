"use client";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Input from "../ui/input";
import useMutationData from "@/hooks/useMutationData";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ModalContext } from "@/context/createContext";
import Select from "../ui/select";
import { CreateRoom } from "@/types";
import { RoomType } from "@prisma/client";
import { createRoom } from "@/handlers/room";

const CreateRoomForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<RoomType>("TEXT");

  const { onClose } = useContext(ModalContext);
  const params = useParams();
  const router = useRouter();
  const { isSuccess, isError, mutate } = useMutationData({ func: createRoom });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let data: CreateRoom = {
      name: nameRef?.current?.value as string,
      type,
      isPrivate: false,
      serverId: params?.serverId as string,
    };

    mutate(data);
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      router.refresh();
      onClose();
    }
  }, [isSuccess, isError]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          {" "}
          <Input label="Room Name" ref={nameRef} />
        </div>
        <div className="mt-3">
          <Select
            label="Room Type"
            name="type"
            value={type}
            setValue={(val) => setType(val as RoomType)}
            options={[
              {
                key: "text",
                name: "Text Room",
                value: "TEXT",
              },
              {
                key: "audio",
                name: "Audio Room",
                value: "AUDIO",
              },
              {
                key: "video",
                name: "Video Room",
                value: "VIDEO",
              },
            ]}
          />
        </div>
        <div className="flex justify-end mt-10">
          <button className="p-2 w-[30%] rounded-md border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-800 font-bold">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

const CreateRoomModal = () => {
  const { type, isOpen, onClose } = useContext(ModalContext);

  const isModal = type === "createRoom" && isOpen;

  return (
    <>
      <Dialog.Root open={isModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[500px] w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-black p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <Dialog.Title className={`text-white m-0 text-[17px] font-medium`}>
              Create Room
            </Dialog.Title>
            <Dialog.Description
              className={`text-black mt-[10px] mb-5 text-[15px] leading-normal`}
            ></Dialog.Description>
            <CreateRoomForm />
            <Dialog.Close>
              <button
                onClick={() => onClose()}
                className="text-gray-600 hover:text-violet-200 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <XCircle />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default CreateRoomModal;
