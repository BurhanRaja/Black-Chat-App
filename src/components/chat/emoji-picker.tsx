"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { ReactNode } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiPickerProps {
  trigger: ReactNode;
  onChange: (value: string) => void;
}

const EmojiPicker = ({ trigger, onChange }: EmojiPickerProps) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>{trigger}</PopoverTrigger>
        <PopoverContent
          side="right"
          sideOffset={40}
          className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
        >
          <Picker
            theme={"dark"}
            data={data}
            onEmojiSelect={(val: any) => onChange(val.native)}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default EmojiPicker;
