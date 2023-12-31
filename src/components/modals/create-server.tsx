"use client";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import FileUpload from "../file-upload";
import Input from "../ui/input";
import useMutationData from "@/hooks/useMutationData";
import { createServer } from "@/handlers/server";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/context/createContext";
import { CreateServer } from "@/types";

// Create Server Form
const CreateServerForm = () => {
  const [file, setFile] = useState<string>("");
  const [error, setError] = useState<string>("");

  const nameRef = useRef<HTMLInputElement>(null);

  const { isSuccess, isError, mutate } = useMutationData({
    func: createServer,
  });
  const { onClose } = useContext(ModalContext);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (nameRef.current?.value.length === 0) {
      setError("The above field is empty.");
      return;
    }
    let data: CreateServer = {
      imageUrl: file,
      name: nameRef.current?.value as string,
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
        <p className="text-sm text-gray-500">Server Image</p>
        <FileUpload
          value={file}
          onChange={(val) => setFile(val)}
          endpoint="serverImage"
        />
        <Input
          ref={nameRef}
          label="Name"
          inputBackgroundColor="bg-neutral-900 border"
          labelTextColor="text-gray-500 mt-2"
          inputTextColor="text-gray-200"
        />
        {nameRef.current?.value.length === 0 && error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
        <div className="flex justify-end mt-10">
          <button className="p-2 w-[30%] rounded-md border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-800 font-bold">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

// Create Server Modal
const CreateServerModal = () => {
  const { type, isOpen, onClose } = useContext(ModalContext);
  const isModal = type === "createServer" && isOpen;

  return (
    <>
      <Dialog.Root open={isModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[500px] w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-black p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <Dialog.Title className={`text-white m-0 text-[17px] font-medium`}>
              Create Server
            </Dialog.Title>
            <Dialog.Description
              className={`text-black mt-[10px] mb-5 text-[15px] leading-normal`}
            ></Dialog.Description>
            <CreateServerForm />
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

export default CreateServerModal;
