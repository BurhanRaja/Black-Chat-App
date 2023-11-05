"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  content: ReactNode;
  title: string;
  description?: string;
  mainBackgroundColor?: string;
  titleTextColor?: string;
  descriptionTextColor?: string;
  width?: string;
  height?: string;
}

const Modal = ({
  open,
  setOpen,
  content,
  title,
  description,
  width,
  height,
  mainBackgroundColor,
  titleTextColor,
  descriptionTextColor,
}: ModalProps) => {
  return (
    <>
      <Dialog.Root open={open}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] ${
              height ? height : "max-h-[85vh]"
            } ${
              width ? width : "w-[90vw] max-w-[450px]"
            } translate-x-[-50%] translate-y-[-50%] rounded-[6px] ${
              mainBackgroundColor ? mainBackgroundColor : "bg-white"
            } p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <Dialog.Title
              className={`${
                titleTextColor ? titleTextColor : "text-black"
              } m-0 text-[17px] font-medium`}
            >
              {title}
            </Dialog.Title>
            <Dialog.Description
              className={`${
                descriptionTextColor ? descriptionTextColor : "text-black"
              } mt-[10px] mb-5 text-[15px] leading-normal`}
            >
              {description}
            </Dialog.Description>
            {content}
            {/* <div className="mt-[25px] flex justify-end">
              <Dialog.Close onClick={() => setOpen(false)}>
                <button className="bg-green-200 text-green-600 hover:bg-green5 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  {submitBtnText}
                </button>
              </Dialog.Close>
            </div> */}
            <Dialog.Close>
              <button
                onClick={() => setOpen(false)}
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

export default Modal;
