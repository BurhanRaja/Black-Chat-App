"use client";

import { FormEvent, useContext, useRef, useState } from "react";
import { AlertContext, ModalContext } from "@/context/createContext";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import Input from "../ui/input";
import SwitchBtn from "../ui/switch";
import { SUserRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const EditRoomForm = () => {
  const { data } = useContext(ModalContext);
  const { setAlertOpen, setDescription, setTitle, setType } =
    useContext(AlertContext);
  const router = useRouter();

  const roomNameRef = useRef<HTMLInputElement>(null);
  const [makePrivate, setMakePrivate] = useState<boolean>(
    data?.room?.isPrivate!
  );
  const [updateCheck, setUpdateCheck] = useState<Array<string>>(
    data?.room?.updatePermission as Array<string>
  );
  const [deleteCheck, setDeleteCheck] = useState<Array<string>>(
    data?.room?.deletePermission as Array<string>
  );
  const [messageCheck, setMessageCheck] = useState<Array<string>>(
    data?.room?.messagePermission as Array<string>
  );
  const [privateCheck, setPrivateCheck] = useState<Array<string>>(
    data?.room?.privatePermission as Array<string>
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      updateCheck.length === 0 ||
      deleteCheck.length === 0 ||
      messageCheck.length === 0
    ) {
      return;
    }

    let updateData = {
      name: roomNameRef.current?.value,
      isPrivate: makePrivate,
      updatePermission: updateCheck,
      deletePermission: deleteCheck,
      messagePermission: messageCheck,
      privatePermission: privateCheck,
    };

    const response = await axios.put(
      `/api/room/${data?.room?.roomId}?serverId=${data?.room?.serverId}`,
      { ...updateData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      setTitle("Success");
      setDescription("Room Settings updated successfully.");
      setType("success");
      setAlertOpen(true);
      router.refresh();
    } else {
      setTitle("Error");
      setDescription("Some Error occured.");
      setType("error");
      setAlertOpen(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <Input
            ref={roomNameRef}
            label="Room Name"
            defaultValue={data?.room?.name}
          />
        </div>
        <div className="mt-5 flex justify-between">
          <p>Make Room Private</p>
          <SwitchBtn
            content=""
            checked={makePrivate}
            onCheck={() => {}}
            setCheck={(val) => setMakePrivate(val)}
          />
        </div>
        <div className="mt-2 flex">
          <div>
            <p className="my-7 pr-5">Update Room</p>
            <p className="my-7 pr-5">Delete Room</p>
            <p className="my-7 pr-5">Message Room</p>
            {data?.room?.isPrivate ||
              (makePrivate && <p className="my-7 pr-5">Private Room Access</p>)}
          </div>
          <div className="w-[70%]">
            <p className="my-6">
              {" "}
              <SwitchBtn
                content="MODERATOR"
                checked={
                  data?.room?.updatePermission.includes(
                    "MODERATOR" as SUserRole
                  )!
                }
                onCheck={(val) =>
                  val
                    ? setUpdateCheck([...updateCheck, val])
                    : setUpdateCheck(
                        updateCheck.filter((el) => el !== "MODERATOR")
                      )
                }
              />
            </p>
            <p className="my-6">
              {" "}
              <SwitchBtn
                content="MODERATOR"
                checked={
                  data?.room?.deletePermission.includes(
                    "MODERATOR" as SUserRole
                  )!
                }
                onCheck={(val) =>
                  val
                    ? setDeleteCheck([...deleteCheck, val])
                    : setDeleteCheck(
                        deleteCheck.filter((el) => el !== "MODERATOR")
                      )
                }
              />
            </p>
            <p className="my-6 w-[100%]">
              {" "}
              <div className="flex justify-between w-[70%]">
                <SwitchBtn
                  content="MODERATOR"
                  checked={
                    data?.room?.messagePermission.includes(
                      "MODERATOR" as SUserRole
                    )!
                  }
                  onCheck={(val) =>
                    val
                      ? setMessageCheck([...messageCheck, val])
                      : setMessageCheck(
                          messageCheck.filter((el) => el !== "MODERATOR")
                        )
                  }
                />
                <SwitchBtn
                  content="MEMBER"
                  checked={
                    data?.room?.messagePermission.includes(
                      "MEMBER" as SUserRole
                    )!
                  }
                  onCheck={(val) =>
                    val
                      ? setMessageCheck([...messageCheck, val])
                      : setMessageCheck(
                          messageCheck.filter((el) => el !== "MEMBER")
                        )
                  }
                />
              </div>
            </p>
            {data?.room?.isPrivate ||
              (makePrivate && (
                <p className="my-6 w-[100%]">
                  {" "}
                  <div className="flex justify-between w-[70%]">
                    <SwitchBtn
                      content="MODERATOR"
                      checked={privateCheck.includes("MODERATOR")}
                      onCheck={(val) =>
                        val
                          ? setPrivateCheck([...privateCheck, val])
                          : setPrivateCheck(
                              privateCheck.filter((el) => el !== "MODERATOR")
                            )
                      }
                    />
                    <SwitchBtn
                      content="MEMBER"
                      checked={privateCheck.includes("MEMBER")}
                      onCheck={(val) =>
                        val
                          ? setPrivateCheck([...privateCheck, val])
                          : setPrivateCheck(
                              privateCheck.filter((el) => el !== "MEMBER")
                            )
                      }
                    />
                  </div>
                </p>
              ))}
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <button className="p-2 w-[30%] rounded-md border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-800 font-bold">
            Update
          </button>
        </div>
      </form>
    </>
  );
};

const EditRoomModal = () => {
  const { type, isOpen, onClose } = useContext(ModalContext);
  const isModal = type === "editRoom" && isOpen;

  return (
    <>
      <Dialog.Root open={isModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[550px] w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-black p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <Dialog.Title className={`text-white m-0 text-[17px] font-medium`}>
              Edit Room Settings
            </Dialog.Title>
            <Dialog.Description
              className={`text-black mt-[10px] mb-5 text-[15px] leading-normal`}
            ></Dialog.Description>
            <EditRoomForm />
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

export default EditRoomModal;
