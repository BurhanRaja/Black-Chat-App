"use client";
import { ReactNode, useState } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CollapsibleProps {
  triggerText: string;
  triggerIcon: ReactNode;
  content: ReactNode;
}

const Collapsible = ({
  triggerText,
  triggerIcon,
  content,
}: CollapsibleProps) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <CollapsiblePrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className="w-[100%]"
      >
        <CollapsiblePrimitive.Trigger className=" w-[100%] hover:cursor-pointer">
          <div className="flex items-center justify-between text-xs text-zinc-400 hover:text-zinc-300 w-[100%] p-2 px-1">
            <div className="flex items-center">
              {open ? (
                <ChevronDown size={14} className="mr-1" />
              ) : (
                <ChevronRight size={14} className="mr-1" />
              )}
              <div>{triggerText.toUpperCase()}</div>
            </div>
            {triggerIcon}
          </div>
        </CollapsiblePrimitive.Trigger>
        <CollapsiblePrimitive.Content className="px-1">{content}</CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    </>
  );
};

export default Collapsible;
