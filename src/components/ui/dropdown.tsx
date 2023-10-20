"use client";

import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { Settings } from "lucide-react";

type ItemArray = {
  content: string;
  link?: string;
  textColor: string;
  hoverBackgroundColor?: string;
  icon?: ReactNode;
};

interface DropdownProps {
  trigger: ReactNode;
  items: Array<ItemArray>;
  contentColor?: string;
  contentWidth: string;
  side?: "left" | "right" | "top" | "bottom";
}

const Dropdown = ({
  trigger,
  items,
  contentColor,
  contentWidth,
  side,
}: DropdownProps) => {
  return (
    <>
      <DropdownPrimitive.Root>
        <DropdownPrimitive.Trigger asChild>{trigger}</DropdownPrimitive.Trigger>
        <DropdownPrimitive.Portal>
          <DropdownPrimitive.Content
            className={`p-1 py-2 ${contentColor} ${contentWidth} rounded-sm`}
            side={side ? side : "bottom"}
          >
            {items?.map((el) => {
              return (
                <DropdownPrimitive.Item
                  key={el.content}
                  className={`leading-none select-none outline-none p-2.5 cursor-pointer ${
                    el.hoverBackgroundColor
                      ? el.hoverBackgroundColor
                      : "hover:bg-zinc-800"
                  } text-sm rounded-sm flex justify-between items-center ${
                    el.textColor
                  }`}
                >
                  <p>{el.content}</p>
                  {el.icon}
                </DropdownPrimitive.Item>
              );
            })}
          </DropdownPrimitive.Content>
        </DropdownPrimitive.Portal>
      </DropdownPrimitive.Root>
    </>
  );
};

export default Dropdown;
