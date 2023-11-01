"use client";
import * as ToolPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";

export interface ToastProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  title: string;
  description: string;
  type: "error" | "success" | "info" | "notification";
}

const Toast = ({ open, setOpen, title, description, type }: ToastProps) => {
  return (
    <>
      <ToolPrimitive.Provider swipeDirection="right" duration={3000}>
        <ToolPrimitive.Root
          open={open}
          className={`${
            type === "error"
              ? "bg-red-600"
              : type === "success"
              ? "bg-green-600"
              : type === "info"
              ? "bg-blue-600"
              : "bg-black"
          } rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut`}
        >
          <ToolPrimitive.Title
            className={`[grid-area:_title] mb-[5px] font-medium text-white text-[15px]`}
          >
            {title}
          </ToolPrimitive.Title>
          <ToolPrimitive.Description
            className={`[grid-area:_description] m-0 text-gray-100 text-[13px] leading-[1.3]`}
          >
            {description}
          </ToolPrimitive.Description>
          <ToolPrimitive.Action
            className="[grid-area:_action]"
            asChild
            altText="Goto schedule to undo"
          >
            <button
              onClick={() => setOpen(false)}
              className={`inline-flex items-center justify-center rounded font-medium text-sm px-[10px] leading-[25px] h-[25px] bg-transparent border-none text-gray-200`}
            >
              <X />
            </button>
          </ToolPrimitive.Action>
        </ToolPrimitive.Root>
        <ToolPrimitive.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </ToolPrimitive.Provider>
    </>
  );
};

export default Toast;
