"use client";

import {
  Root,
  Popover,
  Anchor,
  PopoverTrigger,
  PopoverContent,
  Portal,
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
        {/* <Root> */}
        <PopoverTrigger>{trigger}</PopoverTrigger>
        {/* <Anchor />
        <Portal> */}
          <PopoverContent
            align="center"
            avoidCollisions
            side="right"
            sideOffset={20}
            className="bg-transparent border-none z-50 shadow-none drop-shadow-none mb-16"
          >
            <Picker
              theme={"dark"}
              data={data}
              onEmojiSelect={(val: any) => onChange(val.native)}
            />
          </PopoverContent>
        {/* </Portal> */}
        {/* </Root> */}
      </Popover>
    </>
  );
};

export default EmojiPicker;
