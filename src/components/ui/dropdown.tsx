"use client";

import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import {
  Settings,
  ChevronDown,
  UserPlus2,
  Users2,
  PlusCircle,
  Trash2,
} from "lucide-react";

const Dropdown = () => {
  return (
    <>
      <DropdownPrimitive.Root>
        <DropdownPrimitive.Trigger asChild>
          <button className="flex justify-between items-center p-3 shadow-md focus:outline-0 w-[100%] rounded-sm hover:bg-zinc-600">
            <span>Servername</span>
            <ChevronDown />
          </button>
        </DropdownPrimitive.Trigger>
        <DropdownPrimitive.Portal>
          <DropdownPrimitive.Content className="p-1 py-2 bg-gray-950 w-[230px] rounded-sm mt-2">
            <DropdownPrimitive.Item className="leading-none select-none outline-none p-2.5 cursor-pointer hover:bg-zinc-800 text-sm rounded-sm flex justify-between items-center text-violet-400">
              <p>Invite People</p>
              <UserPlus2 size={16} />
            </DropdownPrimitive.Item>
            <DropdownPrimitive.Item className="leading-none select-none outline-none p-2.5 cursor-pointer hover:bg-zinc-800 text-sm rounded-sm flex justify-between items-center">
              <p>Server Settings</p>
              <Settings size={16} />
            </DropdownPrimitive.Item>
            <DropdownPrimitive.Item className="leading-none select-none outline-none p-2.5 cursor-pointer hover:bg-zinc-800 text-sm rounded-sm flex justify-between items-center">
              <p>Manage Users</p>
              <Users2 size={16} />
            </DropdownPrimitive.Item>
            <DropdownPrimitive.Item className="leading-none select-none outline-none p-2.5 cursor-pointer hover:bg-zinc-800 text-sm rounded-sm flex justify-between items-center">
              <p>Create Channel</p>
              <PlusCircle size={16} />
            </DropdownPrimitive.Item>
            <hr className="border-gray-700 my-1" />
            <DropdownPrimitive.Item className="leading-none select-none outline-none p-2.5 cursor-pointer hover:bg-zinc-800 text-sm rounded-sm flex justify-between items-center text-red-500">
              <p>Delete Server</p>
              <Trash2 size={16} />
            </DropdownPrimitive.Item>
          </DropdownPrimitive.Content>
        </DropdownPrimitive.Portal>
      </DropdownPrimitive.Root>
    </>
  );
};

export default Dropdown;
