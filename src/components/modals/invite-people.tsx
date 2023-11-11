"use client";

import { ModalContext } from "@/context/createContext";
import * as Dialog from "@radix-ui/react-dialog";
import { Copy, XCircle } from "lucide-react";
import { useContext, useState } from "react";

const InvitePeopleCodeModal = () => {
  const { type, isOpen, onClose, data } = useContext(ModalContext);
  const isModal = type === "invitePeople" && isOpen;

  const [copy, setCopy] = useState<boolean>(false);

  return (
    <>
      <Dialog.Root open={isModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[100vh] w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-black p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <Dialog.Title className={`text-white m-0 text-[17px] font-medium`}>
              Invite People
            </Dialog.Title>
            <Dialog.Description
              className={`text-white mt-[10px] mb-5 text-[15px] leading-normal`}
            ></Dialog.Description>
            <div className="bg-gray-700 relative p-2 rounded-md">
              <input
                className="bg-gray-700 outline-none w-[93%]"
                value={
                  process.env.NEXT_PUBLIC_APP_URL! + "/invite/" + data.query
                }
                placeholder="Hello World"
              />
              <button
                className="absolute right-2 bg-gray-700"
                onClick={() => {
                  navigator.clipboard.writeText(
                    process.env.NEXT_PUBLIC_APP_URL! + "/invite/" + data.query
                  );
                  setCopy(true);
                }}
              >
                <Copy size={20} />
              </button>
            </div>
            {copy && (
              <p className="text-xs mt-1 text-green-500">
                Copied to Clipboard!
              </p>
            )}
            <Dialog.Close>
              <button
                onClick={() => {
                  setCopy(false);
                  onClose();
                }}
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

export default InvitePeopleCodeModal;
