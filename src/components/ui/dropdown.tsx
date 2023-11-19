"use client";

import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { Settings } from "lucide-react";
import Link from "next/link";

type ItemArray = {
  content: string | ReactNode;
  link?: string;
  textColor: string;
  hoverBackgroundColor?: string;
  icon?: ReactNode;
  OpenModal?: () => void;
  handleFunction?: Function;
};

interface DropdownProps {
  trigger: ReactNode;
  items: Array<ItemArray>;
  contentColor?: string;
  contentWidth: string;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "end" | "center";
  alignOffset?: number;
}

const Dropdown = ({
  trigger,
  items,
  contentColor,
  contentWidth,
  side,
  align,
  alignOffset,
}: DropdownProps) => {
  return (
    <>
      <DropdownPrimitive.Root>
        <DropdownPrimitive.Trigger asChild>{trigger}</DropdownPrimitive.Trigger>
        <DropdownPrimitive.Portal>
          <DropdownPrimitive.Content
            className={`p-1 py-2 ${contentColor} ${contentWidth} rounded-sm`}
            side={side ? side : "bottom"}
            align={align ? align : "center"}
            alignOffset={alignOffset}
          >
            {items?.map((el) => {
              return (
                <DropdownPrimitive.Item key={el.content as string}>
                  {el.link ? (
                    <Link href={el.link!} className="outline-none">
                      <button
                        className={`leading-none select-none outline-none p-2.5 cursor-pointer w-[100%] ${
                          el.hoverBackgroundColor
                            ? el.hoverBackgroundColor
                            : "hover:bg-zinc-800"
                        } text-sm rounded-sm flex justify-between items-center ${
                          el.textColor
                        }`}
                        onClick={() => {
                          if (el.OpenModal) {
                            el?.OpenModal();
                          }
                          if (el.handleFunction) {
                            el.handleFunction();
                          }
                        }}
                      >
                        {el.content}
                        {el.icon}
                      </button>
                    </Link>
                  ) : (
                    <button
                      className={`leading-none select-none outline-none p-2.5 cursor-pointer w-[100%] ${
                        el.hoverBackgroundColor
                          ? el.hoverBackgroundColor
                          : "hover:bg-zinc-800"
                      } text-sm rounded-sm flex justify-between items-center ${
                        el.textColor
                      }`}
                      onClick={() => {
                        if (el.OpenModal) {
                          el?.OpenModal();
                        }
                        if (el.handleFunction) {
                          el.handleFunction();
                        }
                      }}
                    >
                      {el.content}
                      {el.icon}
                    </button>
                  )}
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
