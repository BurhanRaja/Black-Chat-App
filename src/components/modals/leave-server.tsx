"use client";

import { useContext } from "react";
import { AlertContext, ModalContext } from "@/context/createContext";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LeaveServerModal = () => {
  const { type, isOpen, onClose, data } = useContext(ModalContext);
  const { setAlertOpen, setTitle, setDescription, setType } =
    useContext(AlertContext);
  const isModal = type === "leaveServer" && isOpen;
  const router = useRouter();

  const handleLeaveServer = async () => {
    const response = await axios.get(
      `/api/server/leave/${data.server?.serverId}`
    );

    if (response.data.success) {
      setTitle("Success");
      setDescription("Server deleted Successfully.");
      setType("success");
      setAlertOpen(true);
      onClose();
      router.push(`/me`);
      router.refresh();
    } else {
      setTitle("Error");
      setDescription("Server Error Occured. Please Try Again.");
      setType("error");
      setAlertOpen(true);
    }
  };

  return (
    <>
      <Dialog.Root open={isModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[250px] w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-black p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <Dialog.Title className={`text-white m-0 text-[17px] font-medium`}>
              Delete Server
            </Dialog.Title>
            <Dialog.Description
              className={`text-black mt-[10px] mb-5 text-[15px] leading-normal`}
            ></Dialog.Description>
            <div className=" mb-10">
              <p className="text-2xl font-bold">Are you sure?</p>
              <p className="text-gray-300 mt-2">
                You are about to leave the Server{" "}
                <span className="text-blue-500">{data?.server?.name}</span>.
              </p>
            </div>
            <div className="flex justify-end mt-10">
              <button
                className="p-2 w-[30%] rounded-md border border-gray-200 text-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500 font-bold"
                onClick={handleLeaveServer}
              >
                Leave
              </button>
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

export default LeaveServerModal;
