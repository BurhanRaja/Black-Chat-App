"use client";

import { ModalContext } from "@/context/createContext";
import { useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import Avatar from "../ui/avatar";
import months from "@/utils/months";

const ProfileDetailsModal = () => {
  const { type, isOpen, onClose, data } = useContext(ModalContext);
  const isModal = isOpen && type === "profileDetails";

  let date =
    months[new Date(data?.profile?.createdAt!).getMonth()] +
    " " +
    new Date(data?.profile?.createdAt!).getDate() +
    ", " +
    new Date(data?.profile?.createdAt!).getFullYear();

  return (
    <>
      <Dialog.Root open={isModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[550px] w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-black p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <Dialog.Title className={`text-white m-0 text-[17px] font-medium`}>
              Profile Details
            </Dialog.Title>
            <Dialog.Description
              className={`text-black mt-[10px] mb-5 text-[15px] leading-normal`}
            ></Dialog.Description>
            <div className=" mb-5">
              <Avatar
                image={data?.profile?.imageUrl}
                width="w-[65px]"
                height="h-[65px] rounded-full"
              />
            </div>
            <div className=" mb-5">
              <p className="text-xl font-bold">{data?.profile?.displayname}</p>
              <p className="text-sm font-medium">{data?.profile?.username}</p>
            </div>
            <hr />
            <div className="mt-5 mb-5 p-3 bg-zinc-800 rounded-md">
              <p className="text-md font-bold">Email</p>
              <p className="text-sm font-medium text-gray-300">
                {data?.profile?.email}
              </p>
            </div>
            <hr />
            <div className="mt-5 mb-5 p-3 bg-zinc-800 rounded-md">
              <p className="text-md font-bold">Bio</p>
              <p className="text-sm font-medium text-gray-300">
                {data?.profile?.bio ? data?.profile?.bio : "No data available"}
              </p>
            </div>
            <div className="mt-5 mb-5 p-3 bg-zinc-800 rounded-md">
              <p className="text-md font-bold">Blackchat Member Since</p>
              <p className="text-sm font-medium text-gray-300">{date}</p>
            </div>
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

export default ProfileDetailsModal;
